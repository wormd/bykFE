import {Component, OnInit} from '@angular/core';
import {TransactionsFilterService} from '../_service/transactions-filter.service';

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

  constructor(private filterService: TransactionsFilterService) {
    const year = new Date().getFullYear();
    this.years = [year - 1, year, year + 1];
  }

  ngOnInit(): void {
    this.filterService.get().subscribe(d => {
      this.leftCursor = d.after && this.years.findIndex(x => +x === d.after.getFullYear()) || -1;
      this.rightCursor = d.before && this.years.findIndex(x => +x === d.before.getFullYear()) || -1;
    });
  }

  changeYear(indexes: any) {
    this.leftCursor = indexes.left;
    this.rightCursor = indexes.right;
    this.filterService.toEmitFilter.after.setFullYear(this.years[this.leftCursor]);
    this.filterService.toEmitFilter.before.setFullYear(this.years[this.rightCursor]);
    this.filterService.emitFilter();
  }
}
