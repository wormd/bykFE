import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CashBookLine } from '../_model/cash-book-line';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashBookLineService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/cashbook';
   }

   public find(after: Date, before: Date): Observable<CashBookLine[]> {
    return this.http.get<CashBookLine[]>(this.url);
  }

  public save(line: CashBookLine) {
    return this.http.post<CashBookLine>(this.url, line);
  }

  public delete(id: string) {
    return this.http.delete(this.url+"/"+id, {responseType: 'text'});
  }

  public edit(line: CashBookLine) {
    return this.http.put(this.url, line);
  }
}
