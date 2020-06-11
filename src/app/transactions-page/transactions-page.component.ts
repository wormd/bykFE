import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransactionService} from '../_service/transaction.service';
import {Location} from '@angular/common';
import {Transaction} from '../_model/transaction';
import {AccountService} from '../_service/account.service';
import {Account} from '../_model/account';
import {TransactionsFilterService} from '../_service/transactions-filter.service';
import {Subscription} from 'rxjs';

export function unsub(list: Subscription[]) {
  for (const item of list) {
    item.unsubscribe();
  }
}

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent implements OnInit, OnDestroy {

  transactions: Transaction[];
  accounts: Account[];
  private subs = [];
  filterBy = 'date';
  fromDate: Date;
  toDate: Date;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              public transfService: TransactionsFilterService,
              public transService: TransactionService,
              public accountService: AccountService,
              private location: Location) { }

  ngOnDestroy() {
    unsub(this.subs);
  }

  ngOnInit(): void {
    this.subs.push(this.accountService.accounts$.subscribe(data => {
      this.accounts = data;
    }));
    // this.transfService.resetFilter();
    this.parseParams();
    this.transfService.doFilter();
    this.subs.push(this.transfService.transactions$.subscribe(d => {
      this.transactions = d;
      this.location.go('/transactions/', this.transfService.getQuery(10));
    }));

  }

  get f() {
    return this.transfService.filter;
  }

  get queryMap() {
    return this.activatedRoute.snapshot.queryParamMap;
  }

  parseParams() {
    const page = this.queryMap.get('page');
    const size = this.queryMap.get('size');
    const by = this.queryMap.get('by');
    page ? this.f.page = +page : this.f.page = 1;
    size ? this.f.size = +size : this.f.size = 100;
    by ? this.f.by = by : this.f.by = 'date';
  }

  filterByClick() {
    this.transfService.filter.by = this.filterBy;
    this.transfService.doFilter();
  }

  changeDate(date, key) {
    this.transfService.filter[key] = new Date(date.year, date.month - 1, date.day);
    this.transfService.doFilter();
  }
}
