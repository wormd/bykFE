import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: String;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  getCurrentUser() {
    this.currentUser = this.http.get(this.url+'/currentUser');
    return this.currentUser;
  }

  login(user, pwd) {
    const ret = this.http.post<any>(this.url+'/login', {"username":user, "password":pwd})
    ret.subscribe(u => {
        localStorage.setItem('token', u['token']);
      });
    return ret;
  }

  loggedIn() {
    const token = localStorage.getItem('token')
    if (token) {
      return true
    }
    return false
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
