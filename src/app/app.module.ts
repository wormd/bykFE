import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeFormComponent} from './employee-form/employee-form.component';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {AccountListComponent} from './tools-nav/account-list/account-list.component';
import {TransactionFormComponent} from './tools-nav/transaction-form/transaction-form.component';
import {AccountPageComponent} from './account-page/account-page.component';
import {AccountFormComponent} from './tools-nav/account-form/account-form.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {JwtInterceptor} from './_interceptor/jwt.interceptor';
import {HomepageComponent} from './homepage/homepage.component';
import {PaginationComponent} from './_util/pagination/pagination.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {AccountsListComponent} from './accounts-list/accounts-list.component';
import {CustomCheckboxDirective} from './_directive/custom-checkbox.directive';
import {AlertMessageComponent} from './alert-message/alert-message.component';
import {TransactionsPageComponent} from './transactions-page/transactions-page.component';
import {MonthBarComponent} from './_util/month-bar.component';
import {YearBarComponent} from './_util/year-bar.component';
import {AccountSelectorComponent} from './_util/account-selector.component';
import {BeautifyNumPipe} from './_pipe/beautify-num.pipe';
import {CashbookPageComponent} from './cashbook-page/cashbook-page.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    CashbookPageComponent,
    AccountPageComponent,
    AccountListComponent,
    TransactionsListComponent,
    TransactionFormComponent,
    AccountFormComponent,
    LoginFormComponent,
    HomepageComponent,
    PaginationComponent,
    ConfirmDialogComponent,
    AccountsListComponent,
    CustomCheckboxDirective,
    AlertMessageComponent,
    TransactionsPageComponent,
    MonthBarComponent,
    YearBarComponent,
    AccountSelectorComponent,
    BeautifyNumPipe,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
