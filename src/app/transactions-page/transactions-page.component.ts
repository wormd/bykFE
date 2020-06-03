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
              public transfService: TransactionsFilterService,
              public transService: TransactionService,
              public accountService: AccountService,
              private location: Location) { }

  ngOnInit(): void {
    this.accountService.update();
    this.accountService.accounts$.subscribe(data => {
      this.accounts = data;
    });
    this.transfService.resetFilter();
    this.activatedRoute.queryParams.subscribe(par => {
      par.page ? this.f.page = par.page : this.f.page = 1;
      par.size ? this.f.size = par.size : this.f.size = 100;
      par.by ? this.f.by = par.by : this.f.by = 'date';
      this.transfService.doFilter();
      this.transfService.transactions$.subscribe(d => {
        this.transactions = d;
      });
      this.location.go('/transactions/', this.transfService.getQuery(10));
    });
  }

  get f() {
    return this.transfService.filter;
  }

  filterByClick() {
    this.transfService.filter.by = this.filterby;
    this.transfService.doFilter();
  }
}
