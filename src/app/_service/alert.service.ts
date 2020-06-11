import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private obj = {message: null, type: null, time: null};

  private subject = new Subject();

  private _tick = new Subject<boolean>();

  private _alerts  = {
    danger: false,
    success: false,
  }

  constructor() { }


  message(message: string, type: string, time?: number) {
    this.obj.message = message;
    this.obj.type = type;
    if (time) {
      this.obj.time = time;
    }
    this.subject.next(this.obj);
    for (let key in this._alerts) {
      if (key === type) {
        this.doTick(key);
      }
    }
  }

  get message$() {
      return this.subject.asObservable();
  }

  get tick$() {
    return this._tick.asObservable();
  }

  get alert() {
    return this._alerts;
  }

  doTick(key: string) {
    this._alerts[key] = true;
    this._tick.next(true);
    setTimeout(() => this._alerts[key] = false, this.obj.time);
    setTimeout(() => this._tick.next(false), this.obj.time);
  }
}
