import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../_model/account';
import { Observable } from 'rxjs';

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

  public find(id: string): Observable<Account[]> {
    if (id !== null) {
      return this.http.get<Account[]>(this.url+'?ids='+id);
    }
    return this.http.get<Account[]>(this.url);
  }

}
