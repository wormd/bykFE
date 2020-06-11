import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../../_model/account';
import {AccountService} from '../../_service/account.service';
import {AlertService} from '../../_service/alert.service';

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

  constructor(private accountService: AccountService, public alertService: AlertService) { }

  ngOnInit(): void {
  }

  onSubmit() {
      this.accountService.add(this.account).then(d => {
        this.alertService.message('Account added.', 'success');
        this.resetFields();
      });
  }

  resetFields() {
    this.account = new Account();
  }
}
