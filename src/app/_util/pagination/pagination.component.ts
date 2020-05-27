import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() labels: any[];
  @Input() left: number;
  @Input() right: number;

  selected: string;
  @Output()
  filterclick = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect(index) {
    if (this.left === this.right && this.left !== index) {
      this.left = this.right = index;
      this.filterclick.emit({left: this.left, right: this.right});
    }
  }

  onNext(incr) {
    this.left += incr;
    this.right += incr;
    this.filterclick.emit({left: this.left, right: this.right});
  }
}
