import {Injectable} from '@angular/core';
import {Account} from '../_model/account';

@Injectable({
  providedIn: 'root'
})

export class AccountFilterService {

  accounts: Account[];

  constructor() {
  }

  get() {
    return this.accounts;
  }

  setFilter() {
    return true;
  }

  set(accounts: any) {
    this.accounts = Object.assign([], accounts);
  }

  filterText(text: string) {
      if (text.length >= 2) {
        return this.accounts.filter(acc => new RegExp(text, 'mi').test(acc.name.concat(acc.descr))).slice(0, 10);
      } else {
        return this.accounts;
      }
  }
}
