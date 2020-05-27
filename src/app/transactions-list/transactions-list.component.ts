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
  after: Date;
  before: Date;
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
      par.after ? this.after = new Date(par.after) : this.after = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));
      par.before ? this.before = new Date(par.before) : this.before = new Date(Date.UTC(today.getFullYear(), today.getMonth() + 1, 0));
      this.transService.setFilter(this.after, this.before, this.account);
      this.getTransactions();
    });
  }

  onClickDelete(index: number) {
    const deleteComp = this.modalService.open(ConfirmDialogComponent);
    const trans = this.transactions[index];
    deleteComp.componentInstance.name = 'transaction';
    deleteComp.componentInstance.dict = {date: trans.date, description: trans.descr};
    deleteComp.result.then(res => {
      if (res === 'Ok click') {
        this.transService.delete(this.account.id, trans.id).subscribe(() => this.getTransactions());
      }
    });
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
        this.account = this.transService.filter.account;
        this.after = this.transService.filter.after;
        this.before = this.transService.filter.before;
        this.location.go('/account/' + this.account.id, this.query);
      });
  }

  get query() {
    return `after=${this.after.toISOString().slice(0, 10)}&before=${this.before.toISOString().slice(0, 10)}`;
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
    this.transService.filter.account = item;
    this.filterService.emitFilter();
  }
}
