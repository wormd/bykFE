import {Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../_service/transaction.service';

import { Transaction } from '../_model/transaction';
import { Account } from '../_model/account';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {
  transactions: Transaction[];
  @Input() account: Account;
  @Input() accounts: Account[];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Lug', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: number[];
  month: number;
  year: number;
  monthIndex: number;
  yearIndex: number;
  accountModel: Account;

  formatter = (account: Account) => account.name;

  accountSearch = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.accounts.filter(acc => new RegExp(term, 'mi').test(acc.name)).slice(0, 10)))

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private transService: TransactionService,
              private location: Location,
              ) {
    const year = new Date().getFullYear();
    this.years = [year - 1, year, year + 1];
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(par => {
      (par.month) ? this.month = par.month : this.month = (new Date()).getMonth();
      this.monthIndex = this.month - 1;
      (par.year) ? this.year = par.year : this.year = (new Date()).getFullYear();
      this.yearIndex = this.years.findIndex(x => +x === +this.year);
      this.getTransactions();
    });
  }

  showAmount(target: number): string {
    return parseFloat(String(target)).toFixed(2);
  }

  delTransaction(id: string) {
    this.transService.delete(id);
  }

  getAccountName(accountId: string): string {
    return this.accounts.find(x => +x.id === +accountId).name;
  }

  getTransactions() {
    const after = new Date(this.year, this.month - 1, 1);
    const before = new Date(this.year, this.month, 0);
    this.location.go('/account/' + this.account.id, this.query);
    this.transService.get(this.account.id, after, before).subscribe(data => this.transactions = data);
  }

  changeMonth(index: any) {
    this.month = index + 1;
    this.getTransactions();
  }

  changeYear(index: any) {
    this.year = this.years[index];
    this.getTransactions();
  }

  get query() {
    return `month=${this.month}&year=${this.year}`;
  }

  changeAccount(item) {
    this.account = item.item;
    const query = `month=${this.month}&year=${this.year}`;
    this.location.go('/account/' + this.account.id, this.query);
  }
}
