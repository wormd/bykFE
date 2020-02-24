import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { CashBookComponent } from './cash-book/cash-book.component'

import { EmployeeService } from './_service/employee.service';
import { AccountComponent } from './account/account.component';
import { AccountListComponent } from './account-list/account-list.component';
import { CashBookLineFormComponent } from './cash-book-line-form/cash-book-line-form.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    CashBookComponent,
    AccountComponent,
    AccountListComponent,
    CashBookLineFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
