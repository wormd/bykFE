import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../_service/employee.service';
import {Employee} from '../_model/employee';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
    });
  }

  delete(id: string) {
    this.employeeService.delete(id).subscribe(data => this.ngOnInit())
  }

}
