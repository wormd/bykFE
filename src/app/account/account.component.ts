import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../_service/transaction.service';
import { AccountService } from '../_service/account.service';

import { Transaction } from '../_model/transaction';
import { Account } from '../_model/account';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts: Account[];
  account: Account = new Account();
  private routedAccountId: string;
  public isCollapsed = true;
  transactions: Transaction[];

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private location: Location) { }

  ngOnInit() {
    // this.routedAccountId = this.activatedRoute.snapshot.queryParamMap.get("id");
    this.activatedRoute.params.subscribe(par => {
      this.routedAccountId = par['id'];
      this.reRoute();
  });

    this.accountService.findAll().subscribe(data => {
      this.accounts = data; 
      this.setAccount();
      this.getTransactions();
    });

  }

  reRoute() {

    if (!this.routedAccountId) {
      this.routedAccountId = '0';
    }
    console.log('routedAccountId: '+this.routedAccountId)

    const url = this.router
        .createUrlTree([{id: this.routedAccountId}])
        .toString();

    this.location.go('/accounts/', this.routedAccountId);

  }

  setAccount() {
    // not receiving account/:id means it's the mainpage, so we show the first account in the DB.
    if (!this.routedAccountId) {
      this.account = this.accounts[0];
    } else { // else we show the param they requested
      this.account = this.accounts.find(x => x.id == this.routedAccountId);
    }
  }

  getTransactions() {
    const today: Date = new Date();
    this.accountService.getTransactions(
      this.account.id, 
      new Date(today.getFullYear(), today.getMonth(),1), // first day of the month
      new Date(today.getFullYear(), today.getMonth()+1,0)) // last day of the month
      .subscribe(data => this.transactions = data);
  }

  delete(id: string) {
    this.transactionService.delete(id).subscribe(data => this.ngOnInit());
  }
}
