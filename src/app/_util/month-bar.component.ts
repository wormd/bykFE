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


  constructor(private filterService: TransactionsFilterService) { }

  ngOnInit(): void {
    this.filterService.get().subscribe(d => {
      this.leftCursor = d.after && d.after.getMonth() || -1;
      this.rightCursor = d.before && d.before.getMonth() || -1;
    });
  }

  changeMonth(indexes: any) {
    this.leftCursor = indexes.left;
    this.rightCursor = indexes.right;
    this.filterService.toEmitFilter.after.setMonth(this.leftCursor);
    this.filterService.toEmitFilter.before.setMonth(this.rightCursor + 1);
    this.filterService.toEmitFilter.before.setDate(0);
    this.filterService.emitFilter();
  }
}
