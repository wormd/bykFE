import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../_service/transaction.service';
import { AccountService } from '../_service/account.service';
import { Transaction } from '../_model/transaction';
import { Account } from '../_model/account';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  transaction: Transaction;
  accounts: Account[];
  public model: Observable<any>;

  constructor(private router: Router, private transactionService: TransactionService,
    private accountService: AccountService) {
      // var a: Account = new Account()
      // a.id=0
      // a.name='cash'
      // this.accounts.push(a)
      // console.log('woo')
    }

  formatter = (account: Account) => account.name;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.accounts.filter(account => new RegExp(term, 'mi').test(account.name)).slice(0,10))
  )


  ngOnInit() {
    this.transaction = new Transaction();
    this.accountService.findAll().subscribe(d => {this.accounts = d;});
  }


  onSubmit() {
    this.transactionService.save(this.transaction).subscribe(d=>{this.transaction = new Transaction(); this.ngOnInit()});
  }
}
