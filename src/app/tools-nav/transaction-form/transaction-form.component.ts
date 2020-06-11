import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TransactionService} from '../../_service/transaction.service';
import {AccountService} from '../../_service/account.service';
import {Transaction} from '../../_model/transaction';
import {Account} from '../../_model/account';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../_service/alert.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})

export class TransactionFormComponent implements OnInit {

  transaction: Transaction = new Transaction();

  @Input()
  accounts: Account[];

  @Input() showingAccount: Account;

  dateModel: NgbDateStruct;

  @ViewChild('lineForm') lineForm: NgForm;

  originRequired = false;

  constructor(private router: Router, private transactionService: TransactionService,
              private accountService: AccountService, private calendar: NgbCalendar,
              public alertService: AlertService) {}

  ngOnInit() {
    this.dateModel = this.calendar.getToday();
    if (!this.showingAccount) {
      this.originRequired = true;
    }
  }

  onSubmit() {
    this.transaction.date = new Date(Date.UTC(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day));
    this.transaction.target = this.lf.target.id;
    this.lf.origin ? this.transaction.origin = this.lf.origin.id : this.transaction.origin = this.showingAccount.id;

    this.transactionService.add(this.transaction).then(() => {
          this.alertService.message('Transaction added', 'success');
          this.resetFields();
        });
  }

  get lf() {
    return this.lineForm.value;
  }

  resetFields() {
    this.transaction = new Transaction();
    this.lineForm.reset();
  }
}
