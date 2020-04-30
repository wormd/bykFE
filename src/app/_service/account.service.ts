import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from '../_model/account';
import {Observable, Subject} from 'rxjs';
import {Transaction} from '../_model/transaction';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url: string;
  private list = new Subject<Account[]>();

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/accounts';
  }

  public getAll() {
    return this.list.asObservable();
  }

  public add(account: Account): Observable<Account> {
    const sub = new Subject<Account>();
    this.http.post<Account>(this.url, account).subscribe(d => {
      this.update();
      sub.next(d);
    });
    return sub.asObservable();
  }

  public edit(account: Account) {
    return this.http.put<Account>(this.url, account).subscribe(d => this.update());
  }

  // public getMulti(ids: string): Observable<Account[]> {
  //   return this.http.get<Account[]>(this.url + '?ids=' + ids);
  // }

  // public get(id: string): Observable<Account> {
  //   return this.http.get<Account>(this.url + '/' + id);
  // }

  public update() {
    return this.http.get<Account[]>(this.url).subscribe(d => {
      this.list.next(d);
    });
  }
}
