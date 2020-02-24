import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CashBookLineService } from '../_service/cash-book-line.service';
import { AccountService } from '../_service/account.service';
import { CashBookLine } from '../_model/cash-book-line';
import { Account } from '../_model/account';

@Component({
  selector: 'app-cash-book-line-form',
  templateUrl: './cash-book-line-form.component.html',
  styleUrls: ['./cash-book-line-form.component.css']
})
export class CashBookLineFormComponent implements OnInit {

  cashBookLine: CashBookLine;
  accounts: Account[];

  constructor(private router: Router, private cashBookLineService: CashBookLineService,
     private accountService: AccountService) { }

  ngOnInit() {
    this.cashBookLine = new CashBookLine();
    this.accountService.findAll().subscribe(d => {this.accounts = d});
  }


  onSubmit() {
    this.cashBookLineService.save(this.cashBookLine).subscribe(d=>{this.cashBookLine = new CashBookLine(); this.ngOnInit()});
  }
}
