import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../_service/account.service';
import {TransactionService} from '../_service/transaction.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
  labels: string[];
  @Input()
  currentIndex: number;
  selected: string;
  @Output()
  filterclick = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private transactionService: TransactionService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.selected = this.labels[this.currentIndex];
  }

  onSelect(index) {
    this.currentIndex = index;
    this.selected = this.labels[this.currentIndex];
    this.filterclick.emit(this.currentIndex);
  }

  onNext(incr) {
    this.currentIndex += incr;
    this.selected = this.labels[this.currentIndex];
    this.filterclick.emit(this.currentIndex);
  }
}
