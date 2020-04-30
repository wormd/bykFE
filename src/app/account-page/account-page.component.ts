import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../_service/account.service';
import {Location} from '@angular/common';
import {Account} from '../_model/account';
import {forkJoin} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {TransactionService} from '../_service/transaction.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  accounts: Account[];

  account: any;
  private routedAccountId = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private transactionService: TransactionService,
              private location: Location) { }

  ngOnInit(): void {
    this.accountService.update();
    this.accountService.getAll().subscribe(data => {
      this.activatedRoute.params.subscribe(par => {
        this.accounts = data;
        // not receiving account/:id means it's the mainpage, so we set to the first account in the DB.
        this.setAccount(par);
        this.location.go('/account/' + this.routedAccountId + '');
        this.getTransactions();
      });
    });
  }

  getTransactions() {
    const today: Date = new Date(Date.now());
    const after: Date = new Date(today.getFullYear(), today.getMonth(), 1);
    const before: Date = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.transactionService.setFilters(this.account.id, after, before);
  }

  setAccount(par) {
    if (!this.routedAccountId) {
      this.routedAccountId = 0;
    } else {
      this.routedAccountId = par.id;
    }
    this.account = this.accounts.find(x => +x.id === +this.routedAccountId);
  }
}
