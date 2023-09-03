import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Inject, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})
export class WordFormComponent {
  wordForm: FormGroup = new FormGroup([]);
  currentIndex: number = 0;
  @ViewChildren("element") contenEditables!: QueryList<ElementRef>;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: null | Object,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  

  async initializeForm() {
    this.wordForm = await this.fb.group({
      word: ['', Validators.required],
      clues: this.fb.array([])
    });

    if(!this.data) this.addClue(null);
  }

  get clues() {
    return this.wordForm.controls["clues"] as FormArray;
  }

  getClueControl(index: number) {
    return this.clues.at(index);
  }

  addClue(control?: AbstractControl | null, edit?: boolean) {
    console.log('edit: ', edit);
    const cluesForm = this.fb.group({
        clue: ['', Validators.required]
    });
  
    if((control === null || control?.valid) && !edit ) {
      this.clues.push(cluesForm);
      this.currentIndex = this.clues.length - 1;
    } else if(edit && control?.valid) {
      this.currentIndex = this.clues.length - 1;
      console.log('length', this.clues.length);
      console.log('this.currentIndex', this.currentIndex);
    }
  }

  deleteClue(clueIndex: number) {
    this.clues.removeAt(clueIndex);
    this.currentIndex = this.clues.length - 1;
  }

  logss(any: any) {
    console.log('any', any);
  }

  editClue(index: number) {
    console.log('ca')
    if(!this.clues.controls.some((formGroup, index) => index != this.clues.length - 1 && formGroup.invalid)) {
      this.currentIndex = index;
      setTimeout(() => {
        // .nativeElement.focus();
        this.placeCaretAtEnd(this.contenEditables.toArray()[index])
      });
    }

  }

  drop(event: any) {
    if(event?.container?.data)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  placeCaretAtEnd(el: ElementRef) {
    el.nativeElement.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el.nativeElement);
        range.collapse(false);
        var sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
    } 
}
}
