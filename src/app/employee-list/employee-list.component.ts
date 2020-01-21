import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  employees: Employee[];

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.findAll().subscribe(data => {
      this.employees = data;
    });
  }

  delete(id: string) {
    this.employeeService.delete(id).subscribe(data => this.refreshEmployeeList())
  }

  refreshEmployeeList() {
    this.ngOnInit()
    // this.router.navigateByUrl('refreshcomponent', {skipLocationChange: true}).then(()=>
    //   this.router.navigate(['/employees']));
  }

}
