import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string;
  private currentUser = new Subject();

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  getCurrentUser(): Observable<any> {
      this.http.get<User>(this.url + '/currentUser').subscribe(i => this.currentUser.next(i));
      return this.currentUser.asObservable();
  }

  login(user, pwd) {
    const ret = new Subject();
    this.http.post<any>(this.url + '/login',
      {username: user, password: pwd})
      .subscribe(i => {
        localStorage.setItem('token', i.token);
        ret.next(i);
        this.getCurrentUser();
      });
    return ret.asObservable();
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = new Subject();
  }
}
