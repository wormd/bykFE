import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TransactionService} from '../../_service/transaction.service';
import {AccountService} from '../../_service/account.service';
import {Transaction} from '../../_model/transaction';
import {Account} from '../../_model/account';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
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

  origin: Account;
  target: Account;
  dateModel: NgbDateStruct;

  error = false;
  success = false;

  constructor(private router: Router, private transactionService: TransactionService,
              private accountService: AccountService, private calendar: NgbCalendar,
              private alertService: AlertService) {}


  ngOnInit() {
    this.dateModel = this.calendar.getToday();
  }

  onSubmit() {
    this.transaction.date = new Date(Date.UTC(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day));
    this.transaction.target = this.target.id;
    this.origin ? this.transaction.origin = this.origin.id : this.transaction.origin = this.transactionService.filter.account.id;


    this.transactionService.add(this.transaction)
      .subscribe(() => {
        this.alertService.message('Transaction added', 'success');
        this.alertService.emitTick();
        this.alertService.tick().subscribe(e => this.success = e);
        this.resetFields();
        });

  }

  resetFields() {
    this.transaction = new Transaction();
  }

  selectedTarget(item) {
    this.target = item;
  }

  selectedOrigin(item) {
    this.origin = item;
  }
}
