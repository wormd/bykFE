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
    this.url = 'http://localhost:8080/';
   }

  public add(line: Transaction) {
    line.date.toISOString().slice(0, 10);

    return this.http.post<Transaction>(this.url + 'transactions/', line);
  }

  public delete(accId: string, transId: string) {
    return this.http.delete(this.url + 'account/' + accId + '/transactions/' + transId); // , {responseType: 'text'});
  }

  public edit(line: Transaction) {
    return this.http.put(this.url, line);
  }

   public get(id: string, after: Date, before: Date) {
    const params = {after: after.toISOString().slice(0, 10),
      before: before.toISOString().slice(0, 10)};
    const url = this.url + 'accounts/' + id + '/transactions/';
    return this.http.get<Transaction[]>(url, {params});
  }
}
