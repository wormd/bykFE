import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {TransactionService} from '../_service/transaction.service';

import {Transaction} from '../_model/transaction';
import {Account} from '../_model/account';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {TransactionsFilterService} from '../_service/transactions-filter.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {
  transactions: Transaction[];
  @Input() account: Account;
  @Input() accounts: Account[];
  total = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private transService: TransactionService,
              private filterService: TransactionsFilterService,
              private location: Location,
              private modalService: NgbModal,
              ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(par => {
      const today = new Date();
      // tslint:disable-next-line:one-variable-per-declaration
      let after, before;
      par.after ? after = new Date(par.after) : after = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));
      par.before ? before = new Date(par.before) : before = new Date(Date.UTC(today.getFullYear(), today.getMonth() + 1, 0));
      this.transService.resetFilter();
      this.transService.setFilter(after, before, this.account);
      this.getTransactions();
    });
  }

  onClickDelete(index: number) {
    this.transService.deleteDialog(index);
  }

  getAccountName(id) {
    return this.accounts.find(x => +x.id === +id).name;
  }

  getTransactions() {
    this.transService.get().subscribe(
      data => {
        this.transactions = data;
        this.calculateTotal();
        this.transactions = this.transactions.sort((a, b) =>
          (new Date(a.date)).getTime() - (new Date(b.date)).getTime());
        this.location.go('/account/' + this.transService.filter.account.id, this.transService.getQuery(10));
      });
  }

  get after() {
    return this.transService.filter.after;
  }

  get before() {
    return this.transService.filter.after;
  }

  calculateTotal() {
    this.total = 0;
    this.transactions.map(i => {
      if (i.target !== this.transService.filter.account.id) {
        i.amount *= -1;
      }
      // if you move money to the same account don't add to total.
      if (i.origin !== i.target) {
        this.total += +i.amount;
      }
    });
  }

  changeAccount(item) {
    this.transService.filter.account = item;
    this.transService.doFilter();
  }
}
