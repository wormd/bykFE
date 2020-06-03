import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../_service/transaction.service';
import { TransactionsFilterService } from '../_service/transactions-filter.service';

@Component({
  selector: 'app-year-bar',
  template: `
    <app-pagination
      [labels]="years"
      [left]="leftCursor"
      [right]="rightCursor"
      (filterclick)="changeYear($event)">
    </app-pagination>`,
})
export class YearBarComponent implements OnInit {

  years: number[];
  leftCursor: number;
  rightCursor: number;

  constructor(private service: TransactionsFilterService) {
    const year = new Date().getFullYear();
    this.years = [year - 1, year, year + 1];
  }

  ngOnInit(): void {
    this.service.filter$.subscribe(d => {
      this.leftCursor = d.after && this.years.findIndex(x => +x === d.after.getFullYear()) || -1;
      this.rightCursor = d.before && this.years.findIndex(x => +x === d.before.getFullYear()) || -1;
    });
  }

  changeYear(indexes: any) {
    this.leftCursor = indexes.left;
    this.rightCursor = indexes.right;
    this.service.filter.after.setFullYear(this.years[this.leftCursor]);
    this.service.filter.before.setFullYear(this.years[this.rightCursor]);
    this.service.doFilter();
  }
}
