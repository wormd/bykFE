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

  error = false;
  errorMsg: string;
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
    this.dateModel = this.calendar.getToday();
  }

  onSubmit() {
    this.transaction.date = new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day);
    this.transaction.target = this.targetModel.id;
    this.transaction.origin = this.originModel && this.originModel.id;
    this.transaction.origin = !this.originModel && this.showingAccount.id;

    this.transactionService.add(this.transaction)
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
    this.error === false ? this.error = true : this.error = false;
  }
}
