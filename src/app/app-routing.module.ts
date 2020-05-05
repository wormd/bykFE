import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { CashBookComponent } from './cash-book/cash-book.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import {AccountPageComponent} from './account-page/account-page.component';
import {LoginFormComponent} from './login-form/login-form.component';


const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent},
  { path: 'employee-add', component: EmployeeFormComponent},
  // { path: 'cashbook', component: CashBookComponent},
  { path: 'account', component: AccountPageComponent},
  { path: 'account/:id', component: AccountPageComponent},
  { path: 'transaction-add', component: TransactionFormComponent},
  { path: 'login', component: LoginFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
