import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../_service/transaction.service';
import { AccountService } from '../_service/account.service';

import { Transaction } from '../_model/transaction';
import { Account } from '../_model/account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public cashbook: Transaction[];
  public accounts: Account[];
  public account: Account;
  private list: string;
  public isCollapsed = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService) { }

  ngOnInit() {
    // this.list = this.activatedRoute.snapshot.queryParamMap.get("ids");
    this.accountService.findAll().subscribe(data => {this.accounts = data});
    //this.account = this.accounts[0];
  }

  delete(id: string) {
    this.transactionService.delete(id).subscribe(data => this.ngOnInit());
  }

  show(id: string) {
    let after: Date = new Date();
    after.setMonth(1);
    after.setDate(1);
    let before: Date = new Date();
    before.setMonth(12);
    before.setDate(31);
    this.transactionService.find(after, before).subscribe(data => {this.cashbook = data});
    this.accountService.find(id).subscribe(data => {this.accounts = data});
  }
}
