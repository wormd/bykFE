import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../_model/user';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string;
  private _currentUser = new BehaviorSubject<User>(undefined);

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  fetchCurrentUser() {
    this.http.get<User>(this.url + '/currentUser').subscribe(i => this._currentUser.next(i));
  }

  get currentUser$() {
    return this._currentUser.asObservable();
  }

  login(user, pwd) {
    const ret = new Subject();
    return this.http.post<any>(this.url + '/login',
      {username: user, password: pwd})
      .pipe(tap(i => {
      localStorage.setItem('token', i.token);
      ret.next(i);
      this.fetchCurrentUser();
    }));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.next(undefined);
  }
}
