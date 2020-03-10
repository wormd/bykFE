import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../_service/transaction.service';
import { Router } from '@angular/router';
import { Transaction } from '../_model/transaction';
import { AccountService } from '../_service/account.service';
import { Account } from '../_model/account';


@Component({
  selector: 'app-cashbook',
  templateUrl: './cash-book.component.html',
  styleUrls: ['./cash-book.component.css']
})
export class CashBookComponent implements OnInit {

  private cashbook: Transaction[];
  private accounts: Account[];

  constructor(private router: Router,
    private lineService: TransactionService,
    private accountService: AccountService) { }

  ngOnInit() {
    let after: Date = new Date();
    after.setMonth(1);
    after.setDate(1);
    let before: Date = new Date();
    before.setMonth(12);
    before.setDate(31);
    this.lineService.find(after, before).subscribe(data => {this.cashbook = data});
    this.accountService.findAll().subscribe(data => {this.accounts = data});
  }

  delete(id: string) {
    this.lineService.delete(id).subscribe(data => this.ngOnInit());
  }

}
