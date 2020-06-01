import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransactionService} from '../_service/transaction.service';
import {Location} from '@angular/common';
import {Transaction} from '../_model/transaction';
import {AccountService} from '../_service/account.service';
import {Account} from '../_model/account';
import {TransactionsFilterService} from '../_service/transactions-filter.service';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent implements OnInit {

  transactions: Transaction[];
  accounts: Account[];
  filterby = 'date';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private transService: TransactionService,
              private accountService: AccountService,
              private filterService: TransactionsFilterService,
              private location: Location) { }

  ngOnInit(): void {
    this.accountService.update();
    this.accountService.getAll().subscribe(data => {
      this.accounts = data;
    });
    this.transService.resetFilter();
    this.activatedRoute.queryParams.subscribe(par => {
      par.page ? this.f.page = par.page : this.f.page = 0;
      par.size ? this.f.size = par.size : this.f.size = 100;
      par.by ? this.f.by = par.by : this.f.by = 'date';
      this.transService.doFilter();
      this.transService.get().subscribe(d => {
        this.transactions = d;
      });
      this.location.go('/transactions/', this.transService.getQuery(10));
    });
  }

  get f() {
    return this.transService.filter;
  }

  onClickDelete(index: number) {
    this.transService.deleteDialog(index);
  }

  getAccountName(id) {
    return this.accounts.find(x => +x.id === +id).name;
  }

  filterByClick() {
    this.transService.filter.by = this.filterby;
    this.transService.doFilter();
  }
}
