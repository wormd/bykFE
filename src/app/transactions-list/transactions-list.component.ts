import {Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../_service/transaction.service';
import { AccountService } from '../_service/account.service';

import { Transaction } from '../_model/transaction';
import { Account } from '../_model/account';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {
  transactions: Transaction[];
  @Input() account: Account;
  @Input() accounts: Account[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private transactionService: TransactionService,
              private accountService: AccountService) {}

  ngOnInit() {
    this.transactionService.get().subscribe(data => this.transactions = data);
  }

  showAmount(target: number): string {
    return parseFloat(String(target)).toFixed(2);
  }

  delTransaction(accountId: string, transId: string) {
        this.transactionService.delete(transId);
  }

  getAccountName(accountId: string): string {
    return this.accounts.find(x => +x.id === +accountId).name;
  }
}
