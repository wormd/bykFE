import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from '../_model/account';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {TransactionsFilterService} from '../_service/transactions-filter.service';
import {ControlContainer, NgForm} from '@angular/forms';
import {AlertService} from '../_service/alert.service';

@Component({
  selector: 'app-account-selector',
  template: `<input id='{{placeholder}}' name="{{ modelName }}" type="text" class="form-control"
                        placeholder="{{placeholder}}"
                        [(ngModel)]="accountModel"
                        [ngbTypeahead]="accountSearch"
                        [inputFormatter]="formatter"
                        [resultFormatter]="formatter"
                        [editable]="false"
                        [required] = "required"
                        [class.submit-success]="alertService.alert.success && alerts"
                        [class.submit-error]="alertService.alert.danger && alerts"
                        (selectItem)="changeAccount($event)"/>` ,
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm }],
})

export class AccountSelectorComponent implements OnInit {

  @Input() accounts: Account[];
  @Input() required: boolean;
  @Input() placeholder: string;
  @Input() modelName: string;
  @Input() alerts: boolean;
  @Output() selected = new EventEmitter();
  accountModel: Account;


  formatter = (account: Account) => account.name;

  accountSearch = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.accounts.filter(acc => new RegExp(term, 'mi').test(acc.name)).slice(0, 10)))

  constructor(private filterService: TransactionsFilterService, public alertService: AlertService) {
  }

  ngOnInit(): void {
    this.required = this.required || false;
    this.alerts = this.alerts || false;
  }

  changeAccount(item) {
    this.selected.emit(item.item);
  }

}
