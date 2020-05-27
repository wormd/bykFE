import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransactionService} from '../_service/transaction.service';
import {Location} from '@angular/common';
import {Transaction} from '../_model/transaction';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent implements OnInit {

  transactions: Transaction[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private transactionService: TransactionService,
              private location: Location) { }

  ngOnInit(): void {
  }

}
