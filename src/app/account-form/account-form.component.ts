import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../_model/account';
import {AccountService} from '../_service/account.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  account = new Account();
  sameName = false;
  submitted = false;

  @Input()
  accounts: Account[];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.accounts.find(d => d.name === this.account.name)) {
      this.toggleError();
    } else {
      this.accountService.add(this.account).subscribe(d => {
        this.toggleSuccess();
      });
    }
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
    this.sameName === false ? this.sameName = true : this.sameName = false;
  }
}
