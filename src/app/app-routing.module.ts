import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { CashBookComponent } from './cash-book/cash-book.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent},
  { path: 'employee-add', component: EmployeeFormComponent},
  { path: 'cashbook', component: CashBookComponent},
  { path: 'accounts', component: AccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
