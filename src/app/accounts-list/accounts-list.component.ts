import { Component, OnInit } from '@angular/core';
import {AccountService} from '../_service/account.service';
import { Account } from '../_model/account';
import {AccountFilterService} from '../_service/account-filter.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit {
  accounts: Account[];
  filterService = new AccountFilterService();

  starredItems: any;

  years: number[];
  yearIndex: number;
  year: number;

  constructor(private accountService: AccountService) {
    const year = new Date().getFullYear();
    this.years = [year - 1, year, year + 1];
  }

  ngOnInit(): void {
    this.starredItems = JSON.parse(localStorage.getItem('starred'));
    this.accountService.update();
    this.accountService.getAll().subscribe(data => {
      this.filterService.set(data);
      this.accounts = this.filterService.get();
    });
    this.yearIndex = this.years.findIndex(x => +x === +this.year);

  }

  changeYear(index: any) {
    this.year = this.years[index];
    // todo a
  }

  beautifyNum(target: number) {
    return parseFloat(String(target)).toFixed(2);
  }

  isStarred(id: string): boolean {
    if (this.starredItems && id in this.starredItems) {
      return true;
    }
    return false;
  }

  starClick(id: string) {
    if (this.starredItems) {
      if (!(id in this.starredItems)) {
        this.starredItems.add(id);
      } else {
        this.starredItems.remove(id);
      }
    }
    localStorage.setItem('starred', JSON.stringify(this.starredItems));
  }

  filterText(value) {
    this.accounts = this.filterService.filterText(value);
  }
}
