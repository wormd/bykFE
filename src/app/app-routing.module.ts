import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {AccountPageComponent} from './account-page/account-page.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {HomepageComponent} from './homepage/homepage.component';
import {AccountsListComponent} from './accounts-list/accounts-list.component';
import {TransactionsPageComponent} from './transactions-page/transactions-page.component';
import {CashbookPageComponent} from './cashbook-page/cashbook-page.component';


const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent},
  // { path: 'employee-add', component: EmployeeFormComponent},
  { path: 'cashbook', component: CashbookPageComponent},
  { path: 'account', component: AccountPageComponent},
  { path: 'account/:id', component: AccountPageComponent},
  { path: 'login', component: LoginFormComponent },
  { path: 'accounts', component: AccountsListComponent},
  { path: '', component: HomepageComponent },
  { path: 'transactions', component: TransactionsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
