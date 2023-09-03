import { Directive, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appContentEditor][formControlName]'
})
export class ContentEditorDirective {

  constructor(
    private el: ElementRef,
    private control: AbstractControl
  ) { 

    console.log('el', el)

  }

}
