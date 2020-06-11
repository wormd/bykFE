import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TransactionService} from '../_service/transaction.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../_service/account.service';
import {Account} from '../_model/account';
import {TransactionsFilterService} from '../_service/transactions-filter.service';
import {Location} from '@angular/common';
import {parseParamDates, sortTrans} from '../transactions-list/transactions-list.component';
import {unsub} from '../transactions-page/transactions-page.component';
import {Transaction} from '../_model/transaction';

@Component({
  selector: 'app-cashbook-page',
  templateUrl: './cashbook-page.component.html',
  styleUrls: ['./cashbook-page.component.css']
})
export class CashbookPageComponent implements OnInit, OnDestroy {

  public transactions: Transaction[];
  public accounts: Account[];
  public selectedAccounts: Account[];
  private selectedAccountsIds: string[];
  @Input() account: Account;
  private subs = [];

  constructor(private router: Router,
              public transService: TransactionService,
              public accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private transFService: TransactionsFilterService,
              private location: Location,
              ) { }

  ngOnDestroy() {
    unsub(this.subs);
  }

  ngOnInit() {
    this.subs.push(this.accountService.accounts$.subscribe(accs => {
      this.accounts = accs;
      this.parseParamAccounts(this.queryMap.get('ids'));
      const dates = parseParamDates(this.queryMap);
      this.loadTrans(dates);
      this.location.go('/cashbook/', this.transFService.getQuery(10));
    }));
  }

  loadTrans(dates) {
    // this.transFService.resetFilter();
    this.transFService.filter = {after: dates.after, before: dates.before, accounts: this.selectedAccounts};
    this.transFService.transactions$.subscribe(data => {
      this.transactions = data;
      this.transactions = sortTrans(this.transactions);
    });
  }

  get queryMap() {
    return this.activatedRoute.snapshot.queryParamMap;
  }

  parseParamAccounts(paramAccounts: string) {
    if (paramAccounts) {
      this.selectedAccountsIds = JSON.parse('[' + paramAccounts + ']');
      this.selectedAccounts = this.accounts.filter(d => d.id in this.selectedAccountsIds);
    } else {
      this.selectedAccounts = this.accounts.slice(0, 3);
      this.selectedAccountsIds = [];
      this.selectedAccounts.forEach(d => this.selectedAccountsIds.push(d.id));
    }
  }
}
