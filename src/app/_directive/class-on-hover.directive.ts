import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appClassOnHover]'
})
export class ClassOnHoverDirective implements OnInit {

  @Input() default: string;
  @Input() active: string;
  @Input() hover: string;
  @Output() aclick: EventEmitter<any> = new EventEmitter();
  activeBool = false;
  actual: string;
  el: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.el = elRef.nativeElement;

  }

  ngOnInit() {
    this.actual = this.default;
    this.renderer.addClass(this.el, this.default);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.change(this.hover);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.activeBool) {
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
    this.activeBool ? this.activeBool = false : this.activeBool = true;
    this.change(this.active);
    this.aclick.emit();
  }
}
