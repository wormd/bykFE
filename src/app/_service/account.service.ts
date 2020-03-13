import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from '../_model/account';
import { Transaction } from '../_model/transaction';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:8080/accounts";
  }

  public findAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.url);
  }

  public save(account: Account) {
    return this.http.post<Account>(this.url, account);
  }

  public findFilter(id: string): Observable<Account[]> {
    return this.http.get<Account[]>(this.url+'?ids='+id);
  }

  public find(id: string): Observable<Account> {
    return this.http.get<Account>(this.url+'/'+id)
  }

  public getTransactions(id: string, after: Date, before: Date): Observable<Transaction[]> { 
    const params = {'after': after.toISOString().slice(0,10),
                    'before': after.toISOString().slice(0,10)}

    let url = this.url+'/'+id+'/transactions/';

    return this.http.get<Transaction[]>(url, {params: params});
  }
}
