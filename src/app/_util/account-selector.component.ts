import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from '../_model/account';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {TransactionsFilterService} from '../_service/transactions-filter.service';

@Component({
  selector: 'app-account-selector',
  template: `<input id='account-selector' type="text" class="form-control"
                        placeholder="{{placeholder}}"
                        [(ngModel)]="accountModel"
                        [ngbTypeahead]="accountSearch"
                        [inputFormatter]="formatter"
                        [resultFormatter]="formatter"
                        [editable]="false"
                        required="{{ required }}"
                        (selectItem)="changeAccount($event)"/>`,
})
export class AccountSelectorComponent implements OnInit {

  @Input() accounts: Account[];
  @Input() required;
  @Input() placeholder;
  @Input() inputClasses;
  @Output() selected = new EventEmitter();
  accountModel: Account;


  formatter = (account: Account) => account.name;

  accountSearch = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.accounts.filter(acc => new RegExp(term, 'mi').test(acc.name)).slice(0, 10)))

  constructor(private filterService: TransactionsFilterService) {
  }

  ngOnInit(): void {
    this.required = this.required || false;
  }

  changeAccount(item) {
    this.selected.emit(item.item);
  }

}
