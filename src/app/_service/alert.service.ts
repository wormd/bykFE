import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private obj = {message: null, type: null, time: null};

  private subject = new Subject();

  private internalTick = new Subject<boolean>();

  constructor() { }


  message(message: string, type: string, time?: number) {
    this.obj.message = message;
    this.obj.type = type;
    if (time) {
      this.obj.time = time;
    }
    this.subject.next(this.obj);
  }

  getObs() {
      return this.subject.asObservable();
  }

  tick() {
    return this.internalTick.asObservable();
  }

  emitTick() {
    this.internalTick.next(true);
    setTimeout(() => this.internalTick.next(false), this.obj.time);
  }
}
