import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSub: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) { }

  login(user, pwd) {
    return this.http.post<any>('/users/auth', { user, pwd })
      .pipe(map(u => {
        localStorage.setItem('currentUser', JSON.stringify(u));
        this.currentUserSub.next(u);
        return u;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSub.next(null);
  }
}
