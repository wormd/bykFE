import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../../_model/account';
import {AccountService} from '../../_service/account.service';
import {AlertService} from '../../_service/alert.service';
import {Transaction} from '../../_model/transaction';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  account = new Account();
  success = false;
  error = false;

  @Input()
  accounts: Account[];

  constructor(private accountService: AccountService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  onSubmit() {
      this.accountService.add(this.account).subscribe(d => {
        this.alertService.message('Account added.', 'success');
        this.alertService.emitTick();
        this.alertService.tick().subscribe(e => this.success = e);
        this.resetFields();
      },
        error => {
          this.alertService.tick().subscribe(e => this.error = e);
      });
  }

  resetFields() {
    this.account = new Account();
  }
}
