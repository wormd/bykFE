import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../_service/transaction.service';
import { AccountService } from '../../_service/account.service';
import { Transaction } from '../../_model/transaction';
import { Account } from '../../_model/account';
import { Observable, BehaviorSubject } from 'rxjs';
import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import {AlertService} from '../../_service/alert.service';


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
  success = false;

  constructor(private router: Router, private transactionService: TransactionService,
              private accountService: AccountService, private calendar: NgbCalendar,
              private alertService: AlertService) {}

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
    if (this.originModel) {
      this.transaction.origin = this.originModel.id;
    } else {
      this.transaction.origin = this.showingAccount.id;
    }

    this.transactionService.add(this.transaction)
      .subscribe(d => {
        this.alertService.message('Transaction added', 'success');
        this.alertService.emitTick();
        this.alertService.tick().subscribe(e => this.success = e);
        this.resetFields();
        });

  }

  resetFields() {
    this.transaction = new Transaction();
  }
}
