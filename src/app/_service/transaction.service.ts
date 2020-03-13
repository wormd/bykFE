import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../_model/transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/accounts';
   }

   public find(after: Date, before: Date): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url);
  }

  public add(accountId: string, line: Transaction) {
    return this.http.post<Transaction>(this.url+'/'+accountId+'/transactions', line);
  }

  public delete(id: string) {
    return this.http.delete(this.url+"/"+id, {responseType: 'text'});
  }

  public edit(line: Transaction) {
    return this.http.put(this.url, line);
  }
}
