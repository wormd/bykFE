import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TransactionService} from '../_service/transaction.service';

import {Transaction} from '../_model/transaction';
import {Account} from '../_model/account';
import {TransactionsFilterService} from '../_service/transactions-filter.service';
import {AccountService} from '../_service/account.service';
import {unsub} from '../transactions-page/transactions-page.component';

export function parseParamDates(map: ParamMap) {
  const dates = { after: undefined, before: undefined};
  const paramAfter = map.get('after');
  const paramBefore = map.get('before');
  const today = new Date();
  paramAfter ? dates.after = new Date(paramAfter) : dates.after = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));
  paramBefore ? dates.before = new Date(paramBefore) : dates.before = new Date(Date.UTC(today.getFullYear(), today.getMonth() + 1, 0));
  return dates;
}

export function sortTrans(list: Transaction[]) {
  return list.sort((a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime());
}

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  transactions: Transaction[];
  @Input() account: Account;
  @Input() accounts: Account[];
  accountModel: Account;
  total = 0;
  private subs = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private transFService: TransactionsFilterService,
              public transService: TransactionService,
              public accountService: AccountService,
              private location: Location,
              ) {
  }

  ngOnDestroy() {
    unsub(this.subs);
  }

  ngOnInit() {
    const dates = parseParamDates(this.queryMap);
    // this.transFService.resetFilter();
    this.transFService.filter = {after: dates.after, before: dates.before, account: this.account};
    // this.transFService.doFilter();
    this.subs.push(this.transFService.transactions$.subscribe(data => {
      this.transactions = data;
      this.calculateTotal();
      this.transactions = sortTrans(this.transactions);
      this.location.go('/account/' + this.account.id, this.transFService.getQuery(10));
    }));
  }

  calculateTotal() {
    this.total = 0;
    this.transactions.map(i => {
      if (i.target !== this.account.id) {
        i.amount *= -1;
      }
      // if you move money to the same account don't add to total.
      if (i.origin !== i.target) {
        this.total += +i.amount;
      }
    });
  }

  changeAccount(item) {
    this.transFService.filter.account = item;
    this.account = item;
    this.transFService.doFilter();
  }

  get queryMap() {
    return this.activatedRoute.snapshot.queryParamMap;
  }
}
