import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../_service/transaction.service';
import { AccountService } from '../_service/account.service';
import { Transaction } from '../_model/transaction';
import { Account } from '../_model/account';
import { Observable, BehaviorSubject } from 'rxjs';
import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})

export class TransactionFormComponent implements OnInit {

  transaction: Transaction = new Transaction();

  @Input()
  accounts: Account[];

  @Input()
  showingAccount: Account;

  originModel: Account;
  targetModel: Account;
  dateModel: NgbDateStruct;

  sameAccount = false;
  submitted = false;

  constructor(private router: Router, private transactionService: TransactionService,
              private accountService: AccountService, private calendar: NgbCalendar) {}

  formatter = (account: Account) => account.name;

  searchTarget = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.accounts.filter(target => new RegExp(term, 'mi').test(target.name)).slice(0, 10))
  )

  searchOrigin = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.accounts.filter(origin => new RegExp(term, 'mi').test(origin.name)).slice(0, 10))
  )

  ngOnInit() {
    // this.accountService.getAll().subscribe(d => { this.accounts = d; });
    this.dateModel = this.calendar.getToday();
  }

  onSubmit() {
    this.sameAccount = false;

    this.transaction.date = new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day);
    this.transaction.target = this.targetModel.id;

    if (this.originModel === undefined) {
      this.originModel = this.showingAccount;
    }

    if (this.originModel.id !== this.targetModel.id) {
      this.submitTransaction();
    } else {
      this.toggleError();
    }
  }

  submitTransaction() {
    this.transactionService.add(this.originModel.id, this.transaction)
    .subscribe(d => {
      this.toggleSuccess();
      this.resetFields();
    });
  }

  resetFields() {
    this.transaction = new Transaction();
  }

  toggleSuccess() {
    this._toggleSuccess();
    setTimeout(() => this._toggleSuccess(), 3000);
  }

  toggleError() {
    this._toggleError();
    setTimeout(() => this._toggleError(), 3000);
  }

  _toggleSuccess() {
    this.submitted === true ? this.submitted = false : this.submitted = true;
  }

  _toggleError() {
    this.sameAccount === false ? this.sameAccount = true : this.sameAccount = false;
  }
}
