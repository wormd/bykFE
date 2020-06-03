import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {TransactionService} from '../_service/transaction.service';

import {Transaction} from '../_model/transaction';
import {Account} from '../_model/account';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {TransactionsFilterService} from '../_service/transactions-filter.service';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {
  transactions: Transaction[];
  @Input() account: Account;
  @Input() accounts: Account[];
  accountModel: Account;
  total = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private transFService: TransactionsFilterService,
              public transService: TransactionService,
              public accountService: AccountService,
              private location: Location,) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(par => {
      const today = new Date();
      // tslint:disable-next-line:one-variable-per-declaration
      let after: Date, before: Date;
      par.after ? after = new Date(par.after) : after = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));
      par.before ? before = new Date(par.before) : before = new Date(Date.UTC(today.getFullYear(), today.getMonth() + 1, 0));
      this.transFService.resetFilter();
      this.transFService.filter = {after:after, before:before, account:this.account};
      this.transFService.doFilter();
      this.getTransactions();
    });
  }

  getTransactions() {
    this.transFService.transactions$.subscribe(
      data => {
        this.transactions = data;
        this.account = this.transFService.filter.account;
        this.calculateTotal();
        this.transactions = this.transactions.sort((a, b) =>
          (new Date(a.date)).getTime() - (new Date(b.date)).getTime());
        this.location.go('/account/' + this.account.id, this.transFService.getQuery(10));
      });
  }

  calculateTotal() {
    this.total = 0;
    this.transactions.map(i => {
      if (i.target !== this.transFService.filter.account.id) {
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
}
