import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:8080/employees';
  }

  public findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  public create(employee: Employee) {
    return this.http.post<Employee>(this.url, employee);
  }

  public delete(id: string) {
    return this.http.delete(this.url+"/"+id);
  }
}
