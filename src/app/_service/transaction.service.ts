import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Transaction} from '../_model/transaction';
import {Subject} from 'rxjs';
import {TransactionsFilter} from '../_model/transactions-filter';
import {TransactionsFilterService} from './transactions-filter.service';
import {Account} from '../_model/account';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactions = new Subject<Transaction[]>();
  private readonly url = 'http://localhost:8080/';
  constructor(private http: HttpClient,
              private filterService: TransactionsFilterService,
              private modalService: NgbModal) {
    this.filterService.get().subscribe(d => this.fetchData(d));
  }

  public add(line: Transaction) {
    line.date.toISOString().slice(0, 10);
    const post = this.http.post<Transaction>(this.url + 'transactions/', line);
    post.subscribe(() => this.fetchData(this.filter));
    return post;
  }

  public delete(transId: string) {
    return this.http.delete(this.url + 'transactions/' + transId).subscribe(() => this.fetchData(this.filter));
  }

  public deleteDialog(index: number) {
    const deleteComp = this.modalService.open(ConfirmDialogComponent);
    const trans = this.transactions[index];
    deleteComp.componentInstance.name = 'transaction';
    deleteComp.componentInstance.dict = {date: trans.date, description: trans.descr};
    deleteComp.result.then(res => {
      if (res === 'Ok click') {
        this.delete(trans.id);
      }
    });
  }

  public edit(line: Transaction) {
    return this.http.put(this.url, line);
  }

  public get() {
    return this.transactions.asObservable();
  }

  fetchData(filter: TransactionsFilter) {
    let url = '';
    if (filter.account) {
      url = this.url + 'accounts/' + filter.account.id + '/transactions/';
    } else {
      url = this.url + 'transactions/';
    }
    const params = this.genParams(filter);
    console.log(params);
    this.http.get<Transaction[]>(url, {params}).subscribe(d => {
      this.transactions.next(d);
    });
  }

  setFilter(after: Date, before: Date, account?: Account, by?: string, page?: number, size?: number) {
    this.filterService.setFilter(after, before, account, by, page, size);
    this.filterService.emitFilter();
  }

  get filter() {
    return this.filterService.toEmitFilter;
  }

  resetFilter() {
    this.filterService.setFilter(undefined, undefined);
  }

  doFilter() {
    this.filterService.emitFilter();
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

  getQuery(sliceDates: number) {
    return this.genParams(this.filter, sliceDates).toString();
  }
}
