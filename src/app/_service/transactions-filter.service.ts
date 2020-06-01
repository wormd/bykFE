import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {TransactionsFilter} from '../_model/transactions-filter';
import {Account} from '../_model/account';

export interface FilterParams {
  account?: Account;
  after: Date;
  before: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsFilterService {

  private filter = new ReplaySubject<TransactionsFilter>();
  public toEmitFilter = new TransactionsFilter();

  constructor() { }

  setFilter(after: Date, before: Date, account?: Account, by?: string, page?: number, size?: number) {
    this.toEmitFilter.account = account;
    this.toEmitFilter.after = after;
    this.toEmitFilter.before = before;
    this.toEmitFilter.by = by;
    this.toEmitFilter.page = page;
    this.toEmitFilter.size = size;
  }

  emitFilter() {
    this.filter.next(this.toEmitFilter);
  }

  get() {
    return this.filter.asObservable();
  }
}
