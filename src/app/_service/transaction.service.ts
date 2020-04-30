import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../_model/transaction';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private url: string;
  private list = new Subject<Transaction[]>();
  private accountId: string;
  private after: Date;
  private before: Date;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/accounts';
   }

   public find(after: Date, before: Date): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url);
  }

  public add(accountId: string, line: Transaction): Observable<Transaction> {
    const subject = new Subject<Transaction>();

    line.date.toISOString().slice(0, 10);

    this.http.post<Transaction>(this.url + '/' + accountId + '/transactions', line)
      .subscribe(d => {
        this.updateTransaction();
        subject.next(d);
      });
    return subject.asObservable();
  }

  public delete(id: string) {
    return this.http.delete(this.url + '/' + id, {responseType: 'text'})
      .subscribe( d => this.updateTransaction());
  }

  public edit(line: Transaction) {
    return this.http.put(this.url, line)
      .subscribe(d => this.updateTransaction());
  }

  public get() {
    return this.list.asObservable();
  }

  public setFilters(id: string, after: Date, before: Date): void {
    this.accountId = id;
    this.after = after;
    this.before = before;
    this.updateTransaction();
  }
  private updateTransaction(): void {
    const params = {after: this.after.toISOString().slice(0, 10),
      before: this.before.toISOString().slice(0, 10)};

    const url = this.url + '/' + this.accountId + '/transactions/';
    this.http.get<Transaction[]>(url, {params}).subscribe(d => {
      this.list.next(d);
    });
  }
}
