import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Transaction} from '../_model/transaction';
import {ReplaySubject, Subject} from 'rxjs';
import {TransactionsFilter} from '../_model/transactions-filter';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {tap} from 'rxjs/operators';

interface Count {
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private _transactions = new Subject<Transaction[]>();
  private _lastFilter: TransactionsFilter;
  private _count = new ReplaySubject<number>();

  private readonly _addr = 'http://localhost:8080/';
  constructor(private http: HttpClient,
              private modalService: NgbModal,
              ) {
  }

  public add(line: Transaction): Promise<Transaction> {
    return this.http.post<Transaction>(this.url, line).pipe(tap(() => this.fetchData(this._lastFilter))).toPromise();
  }

  public delete(transId: string) {
    return this.http.delete(this.url + transId).pipe(tap(() => this.fetchData(this._lastFilter))).toPromise();
  }

  public deleteDialog(trans: Transaction) {
    const deleteComp = this.modalService.open(ConfirmDialogComponent);
    deleteComp.componentInstance.name = 'transaction';
    deleteComp.componentInstance.dict = {date: trans.date, description: trans.descr};
    deleteComp.result.then(res => {
      if (res === 'Ok click') {
        this.delete(trans.id);
      }
    });
  }

  public edit(line: Transaction) {
    return this.http.put<Transaction>(this.url, line).pipe(tap(() => this.fetchData(this._lastFilter))).toPromise();
  }

  get transactions$() {
    return this._transactions.asObservable();
  }

  fetchData(filter: TransactionsFilter) {
    this._lastFilter = filter;
    const params = this.genParams(filter);
    if (filter.accounts) {
      this.http.get<Transaction[]>(this._addr + 'transactions-m', {params}).
        subscribe(d => this._transactions.next(d));
    } else {
      if (filter.account) {
        this.http.get<Transaction[]>(this.urlAccount(filter.account), {params})
          .subscribe(d => this._transactions.next(d));
      } else {
        this.http.get<Transaction[]>(this.url, {params}).subscribe(d => {
          this._transactions.next(d);
          this.count();
        });
      }
    }
  }

  genParams(filter: TransactionsFilter, sliceDates?: number) {
    let params = new HttpParams();
    if (filter.after) {
      params = params.append('after', filter.after.toISOString().slice(0, sliceDates));
    }
    if (filter.before) {
      params = params.append('before', filter.before.toISOString().slice(0, sliceDates));
    }
    if (filter.by) {
      params = params.append('by', filter.by);
    }
    if (filter.page === 0 || filter.page) {
      params = params.append('page', String(filter.page));
    }
    if (filter.size) {
      params = params.append('size', String(filter.size));
    }
    if (filter.accounts) {
      const ids = filter.accounts.map(a => a.id);
      params = params.append('ids', ids.join(','));
    }
    return params;
  }

  public count() {
    this.http.get<Count>(this.url + '/count').subscribe(d => this._count.next(d.count));
  }

  get count$() {
    return this._count.asObservable();
  }

  get url() {
    return this._addr + 'transactions';
  }

  urlAccount(account) {
    return this._addr + 'accounts/' + account.id + '/transactions/';
  }
}
