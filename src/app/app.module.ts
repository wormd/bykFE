import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { CashBookComponent } from './cash-book/cash-book.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { AccountListComponent } from './account-list/account-list.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    // CashBookComponent,
    AccountPageComponent,
    AccountListComponent,
    TransactionsListComponent,
    TransactionFormComponent,
    AccountFormComponent,
    LoginFormComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
