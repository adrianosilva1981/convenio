import { Directive, ElementRef, Input, AfterContentInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[autoFocus]'
})
export class AutofocusDirective implements AfterContentInit {

  @Input() public appAutoFocus: boolean;

  public constructor(
    private el: ElementRef
  ) { }

  public ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 500);
  }
}