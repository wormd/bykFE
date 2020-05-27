import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transaction} from '../_model/transaction';
import {Subject} from 'rxjs';
import {TransactionsFilter} from '../_model/transactions-filter';
import {TransactionsFilterService} from './transactions-filter.service';
import {Account} from '../_model/account';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactions = new Subject<Transaction[]>();
  private readonly url = 'http://localhost:8080/';
  constructor(private http: HttpClient, private filterService: TransactionsFilterService) {
    this.filterService.get().subscribe(d => this.fetchData(d));
  }

  public add(line: Transaction) {
    line.date.toISOString().slice(0, 10);
    const post = this.http.post<Transaction>(this.url + 'transactions/', line);
    this.filterService.emitFilter();
    return post;
  }

  public delete(accId: string, transId: string) {
    return this.http.delete(this.url + 'account/' + accId + '/transactions/' + transId);
  }

  public edit(line: Transaction) {
    return this.http.put(this.url, line);
  }

  public get() {
    return this.transactions.asObservable();
  }

  fetchData(filter: TransactionsFilter) {
    const params = {after: filter.after.toISOString().slice(0, 10),
                    before: filter.before.toISOString().slice(0, 10)};
    let add = '';
    if (filter.account) {
      add = this.url + 'accounts/' + filter.account.id + '/transactions/';
    } else {
      add = this.url + 'transactions/';
    }
    this.http.get<Transaction[]>(add, {params}).subscribe(d => {
      this.transactions.next(d);
    });
  }

  setFilter(after: Date, before: Date, account?: Account) {
    this.filterService.setFilter(after, before, account);
    this.filterService.emitFilter();
  }

  get filter() {
    return this.filterService.toEmitFilter;
  }
}
