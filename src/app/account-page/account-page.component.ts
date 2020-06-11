import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../_service/account.service';
import {Location} from '@angular/common';
import {Account} from '../_model/account';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  accounts: Account[];

  account: Account;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private location: Location) {
  }

  ngOnInit(): void {
    // this.accountService.update();
    this.accountService.accounts$.subscribe(data => {
      this.activatedRoute.params.subscribe(par => {
        this.accounts = data;
        if (par.id) {
          this.account = this.accounts.find(i => +i.id === +par.id);
        } else {
          this.account = this.accounts[0];
        }
      });
    });
  }
}
