import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {TransactionsFilter} from '../_model/transactions-filter';
import {Transaction} from '../_model/transaction';
import {Account} from '../_model/account';
import {TransactionService} from './transaction.service';

interface ParamFilter {
  account?: Account;
  accounts?: Account[];
  after?: Date;
  before?: Date;
  by?: string;
  page?: number;
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsFilterService {

  private _transactions = new Subject<Transaction[]>();
  private _filter = new Subject<TransactionsFilter>();
  private _nextFilter = new TransactionsFilter();

  constructor(private service: TransactionService) {
    this._filter.subscribe(d => this.service.fetchData(d));
    this.service.transactions$.subscribe(d => this._transactions.next(d));
  }

  set filter(newFilter: ParamFilter) {
    this._nextFilter.account = newFilter.account;
    this._nextFilter.accounts = newFilter.accounts;
    this._nextFilter.after = newFilter.after;
    this._nextFilter.before = newFilter.before;
    this._nextFilter.by = newFilter.by;
    this._nextFilter.page = newFilter.page;
    this._nextFilter.size = newFilter.size;
    this.doFilter();
  }

  get transactions$() {
    return this._transactions.asObservable();
  }

  get filter() {
    return this._nextFilter;
  }

  get filter$() {
    return this._filter.asObservable();
  }

  resetFilter() {
    this.filter = {};
  }

  doFilter() {
    this._filter.next(this._nextFilter);
  }

  get count$() {
    return this.service.count$;
  }

  getQuery(slice: number) {
    return this.service.genParams(this._nextFilter, 10).toString();
  }
}
