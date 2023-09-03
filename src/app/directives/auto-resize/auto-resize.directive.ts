import { Directive, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[autoResize]'
})
export class AutoResizeDirective {

  constructor(
    private el: ElementRef,
    private control: AbstractControl
  ) { 
    console.group('AutoResizeDirective');
    console.log('el: ', this.el);
    console.log('control: ', this.control);
    console.groupEnd();
  }

}
