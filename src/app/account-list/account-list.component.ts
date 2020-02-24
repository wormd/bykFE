import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AccountService } from '../_service/account.service';
import { Account } from '../_model/account';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  private accounts: Account[];

  constructor(private router: Router, 
    private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.findAll().subscribe(data => {this.accounts = data});
  }

}
