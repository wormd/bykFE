import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-beautify-num',
  template: `&euro; {{ output }}`,
})
export class BeautifyNumComponent {

  @Input()
  color = 'red';

  public output: any;

  constructor(private elRef: ElementRef) { }

  @Input()
  set num(input: string) {
    this.output = parseFloat(input).toFixed(2);
    if (+input < 0) {
      this.elRef.nativeElement.style.color = this.color;
    }
  }
}
