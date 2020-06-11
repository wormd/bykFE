import {Component, OnInit} from '@angular/core';
import {AlertService} from '../_service/alert.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  public obj: any;
  public show = false;
  private ms = 3000;


  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.message$.subscribe(d => {
      this.obj = d;
      if (!this.obj.time) {
        this.obj.time = this.ms;
      }
    });
    this.alertService.tick$.subscribe(d => this.show = d);
  }
}
