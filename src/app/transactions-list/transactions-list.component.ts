import {Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../_service/transaction.service';

import { Transaction } from '../_model/transaction';
import { Account } from '../_model/account';
import {observable, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

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
  total = 0;

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
              private modalService: NgbModal
              ) {
    const year = new Date().getFullYear();
    this.years = [year - 1, year, year + 1];
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(par => {
      (par.month) ? this.month = par.month : this.month = (new Date()).getMonth() + 1;
      this.monthIndex = this.month - 1;
      (par.year) ? this.year = par.year : this.year = (new Date()).getFullYear();
      this.yearIndex = this.years.findIndex(x => +x === +this.year);
      this.getTransactions();
    });
  }

  onClickDelete(id: string) {
    const deleteComp = this.modalService.open(ConfirmDialogComponent);
    const trans = this.transactions.find(i => +i.id === +id);
    deleteComp.componentInstance.name = 'transaction';
    deleteComp.componentInstance.dict = {date: trans.date, description: trans.descr};
    deleteComp.result.then(res => {
      if (res === 'Ok click') {
        this.transService.delete(this.account.id, id).subscribe(i => this.getTransactions());
      }
    });
  }

  getAccountName(id) {
    return this.accounts.find(x => +x.id === +id).name;
  }

  getTransactions() {
    const after = new Date(this.year, this.month - 1, 1);
    const before = new Date(this.year, this.month, 0);
    this.location.go('/account/' + this.account.id, this.query);
    this.total = 0;
    this.transService.get(this.account.id, after, before).subscribe(
      data => {
        this.transactions = data;
        this.transactions.map(i => {
          if (i.target !== this.account.id) {
            i.amount *= -1;
          }
          this.total += +i.amount;
        });
      });
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
    this.getTransactions();
  }

  beautifyNum(target: number) {
    return parseFloat(String(target)).toFixed(2);
  }
}
