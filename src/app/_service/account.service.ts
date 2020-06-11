import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../_model/account';
import {ReplaySubject, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url: string;
  private _list = new ReplaySubject<Account[]>();
  private _accounts;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/accounts';
  }

  get accounts$() {
    if (!this._accounts) { this.update(); }
    return this._list.asObservable();
  }

  public add(account: Account) {
    return this.http.post<Account>(this.url, account).pipe(tap(() => this.update())).toPromise();
  }

  public edit(account: Account) {
    return this.http.put<Account>(this.url, account).pipe(tap(() => this.update())).toPromise();
  }

  public getOne(id: string) {
    return this.http.get<Account>(this.url + '/' + id).toPromise();
  }

  public get(ids: string[]) {
    return this.http.get<Account[]>(this.url + '/', {params: {id: ids.join(',')}}).toPromise();
  }

  public update() {
    this.http.get<Account[]>(this.url).subscribe(d => {
      this._accounts = d;
      this._list.next(d);
    });
  }

  public refreshTotal(id: string) {
    return this.http.get<Account[]>(`${this.url}/${id}/total`).pipe(tap(() => this.update()));
  }

  getAccountName(id) {
    return this._accounts.find(x => +x.id === +id).name;
  }
}
