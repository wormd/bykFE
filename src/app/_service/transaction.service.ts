import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../_model/transaction';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/accounts';
   }

  public add(accountId: string, line: Transaction) {
    line.date.toISOString().slice(0, 10);

    return this.http.post<Transaction>(this.url + '/' + accountId + '/transactions', line);
  }

  public delete(id: string) {
    return this.http.delete(this.url + '/' + id, {responseType: 'text'});
  }

  public edit(line: Transaction) {
    return this.http.put(this.url, line);
  }

   public get(id: string, after: Date, before: Date) {
    const params = {after: after.toISOString().slice(0, 10),
      before: before.toISOString().slice(0, 10)};
    const url = this.url + '/' + id + '/transactions/';
    return this.http.get<Transaction[]>(url, {params});
  }
}
