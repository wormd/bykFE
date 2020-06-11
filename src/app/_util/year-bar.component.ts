import {Component, OnInit} from '@angular/core';
import {TransactionsFilterService} from '../_service/transactions-filter.service';

export function mod(n, m) {
  return ((n % m) + m) % m;
}

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
      this.leftCursor = d.after && this.years.findIndex(x => +x === d.after.getFullYear());
      this.rightCursor = d.before && this.years.findIndex(x => +x === d.before.getFullYear());
    });
  }

  changeYear(indexes: any) {
    if (!(this.leftCursor === this.rightCursor && this.leftCursor === +indexes.left)) {
      this.f.after = this.f.after || new Date(Date.UTC(2020, 0, 1)); // year will be changed after anyway.
      this.f.after.setFullYear(this.years[mod(indexes.left, this.years.length)]);
      this.f.before = this.f.before || new Date(Date.UTC(2020, 11, 31)); // same.
      this.f.before.setFullYear(this.years[mod(indexes.right, this.years.length)]);
      this.service.doFilter();
    }
  }

  get f() {
    return this.service.filter;
  }
}
