import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../_model/account';
import {Observable, Subject} from 'rxjs';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url: string;
  private _list = new Subject<Account[]>();
  private _accounts;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/accounts';
  }

  get accounts$() {
    return this._list.asObservable();
  }

  public add(account: Account): Observable<Account> {
    const res$ = this.http.post<Account>(this.url, account);
    res$.subscribe(() => this.update());
    return res$;
  }

  public edit(account: Account) {
    return this.http.put<Account>(this.url, account).subscribe(() => this.update());
  }

  public getOne(id: string): Observable<Account> {
    return this.http.get<Account>(this.url + '/' + id);
  }

  public get(ids: string[]) {
    return this.http.get<Account[]>(this.url + '/', {params: {id: ids.join(',')}});
  }

  public update() {
    this.http.get<Account[]>(this.url).subscribe(d => {
      this._accounts = d;
      this._list.next(d);
    });
  }

  public refreshTotal(id: string) {
    const res$ = this.http.get<Account[]>(`${this.url}/${id}/total`).pipe(share());
    res$.subscribe(() => this.update());
    return res$;
  }

  getAccountName(id) {
    return this._accounts.find(x => +x.id === +id).name;
  }
}
