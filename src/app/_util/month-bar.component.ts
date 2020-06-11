import {Component, OnInit} from '@angular/core';
import {TransactionsFilterService} from '../_service/transactions-filter.service';

@Component({
  selector: 'app-month-bar',
  template: `
    <app-pagination
      [labels]="months"
      [left]="leftCursor"
      [right]="rightCursor"
      (filterclick)="changeMonth($event)">
    </app-pagination>`,
})
export class MonthBarComponent implements OnInit {

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Lug', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
  leftCursor: number;
  rightCursor: number;


  constructor(private service: TransactionsFilterService) { }

  ngOnInit(): void {
    this.service.filter$.subscribe(d => {
      this.leftCursor = d.after && d.after.getMonth();
      this.rightCursor = d.before && d.before.getMonth();
    });
  }

  changeMonth(indexes: any) {
    if (!(this.leftCursor === this.rightCursor && this.leftCursor === +indexes.left)) {
      const now = new Date();
      this.f.after = this.f.after || new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      this.f.after.setMonth(indexes.left, 1);
      this.f.before = this.f.before || new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      this.f.before.setMonth(indexes.right + 1, 0);
      this.service.doFilter();
    }
  }

  get f() {
    return this.service.filter;
  }
}
