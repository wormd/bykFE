import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CashBookLineService } from '../_service/cash-book-line.service';
import { AccountService } from '../_service/account.service';

import { CashBookLine } from '../_model/cash-book-line';
import { Account } from '../_model/account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private cashbook: CashBookLine[];
  private accounts: Account[];
  private list: string;
  public isCollapsed = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, 
    private lineService: CashBookLineService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.list = this.activatedRoute.snapshot.queryParamMap.get("ids");
    this.accountService.find(this.list).subscribe(data => {this.accounts = data});
  }

  delete(id: string) {
    this.lineService.delete(id).subscribe(data => this.ngOnInit());
  }

  show(id: string) {
    let after: Date = new Date();
    after.setMonth(1);
    after.setDate(1);
    let before: Date = new Date();
    before.setMonth(12);
    before.setDate(31);
    this.lineService.find(after, before).subscribe(data => {this.cashbook = data});
    this.accountService.find(id).subscribe(data => {this.accounts = data});
  }
}
