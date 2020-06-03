import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Transaction} from '../_model/transaction';
import {Subject, ReplaySubject} from 'rxjs';
import {TransactionsFilter} from '../_model/transactions-filter';
import {Account} from '../_model/account';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { last } from 'rxjs/operators';

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

  private readonly url = 'http://localhost:8080/';
  constructor(private http: HttpClient,
              private modalService: NgbModal,
              ) {
  }

  public add(line: Transaction): Promise<Transaction> {
    const post = this.http.post<Transaction>(this.url + 'transactions/', line).toPromise()
    post.then(() => this.fetchData(this._lastFilter));
    return post;
  }

  public delete(transId: string) {
    const post = this.http.delete(this.url + 'transactions/' + transId).toPromise()
    post.then(() => this.fetchData(this._lastFilter));
    return post;
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
    const post = this.http.put<Transaction>(this.url + 'transactions/', line).toPromise()
    post.then(() => this.fetchData(this._lastFilter));
    return post;
  }

  get transactions$() {
    return this._transactions.asObservable();
  }

  fetchData(filter: TransactionsFilter) {
    this._lastFilter = filter;
    let url = '';
    if (filter.account) {
      url = this.url + 'accounts/' + filter.account.id + '/transactions/';
    } else {
      url = this.url + 'transactions/';
    }
    const params = this.genParams(filter);
    this.http.get<Transaction[]>(url, {params}).subscribe(d => {
      this._transactions.next(d);
      if (!filter.account) {
        this.count();
      }
    });
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
    return params;
  }

  public count() {
    this.http.get<Count>(this.url + 'transactions/count').subscribe(d => this._count.next(d.count))
  }

  get count$() {
    return this._count.asObservable();
  }
}
