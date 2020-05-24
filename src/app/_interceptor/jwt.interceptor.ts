import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService} from '../_service/alert.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone( {setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }});
    }
    if (request.body) {
      console.log(JSON.stringify(request.body));
    }
    return next.handle(request).pipe(tap(()  => {}, err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      }
      this.alertService.message(`Error: ${err.status}, message ${err.message}`, 'danger');
      this.alertService.emitTick();
    }));
  }
}
