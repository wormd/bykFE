import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appCustomCheckbox]'
})
export class CustomCheckboxDirective implements OnInit {

  @Input() default: string;
  @Input() active: string;
  @Input() hover: string;
  @Output() aclick: EventEmitter<any> = new EventEmitter();
  @Input() clicked: boolean;
  actual: string;
  el: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.el = elRef.nativeElement;
  }

  ngOnInit() {
    if (this.clicked === undefined) {
      this.clicked = false;
    }
    this.actual = this.default;
    if (this.clicked) {
      this.renderer.addClass(this.el, this.active);
    } else {
      this.renderer.addClass(this.el, this.default);
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.change(this.hover);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.clicked) {
      this.change(this.active);
    } else {
      this.change(this.default);
    }
  }

  private change(item: string) {
    this.renderer.removeClass(this.el, this.actual);
    this.renderer.addClass(this.el, item);
    this.actual = item;
  }

  @HostListener('click') onClick() {
    this.clicked ? this.clicked = false : this.clicked = true;
    this.change(this.active);
    this.aclick.emit();
  }
}
