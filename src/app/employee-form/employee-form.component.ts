import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {

  employee: Employee;
  constructor(private route: ActivatedRoute, private router: Router,
    private employeeService: EmployeeService) {
      this.employee = new Employee();
     }

  onSubmit() {
    this.employeeService.save(this.employee).subscribe(data => this.gotoEmployeeList());
  }

  gotoEmployeeList() {
    this.router.navigate(['/employees']);
  }

  ngOnInit() {
  }

}
