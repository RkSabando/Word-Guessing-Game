import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Inject, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Word } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss'],
  standalone: true,
  imports:[
    NgIf,
    NgClass,
    NgFor,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    DragDropModule,
    MatIconModule,
    SlicePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WordFormComponent {
  wordForm: FormGroup = new FormGroup([]);
  currentIndex: number = 0;
  textAreaDefaultHeight:number = 42;
  isEditing: boolean = false;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: null | Word,
    private fb: FormBuilder,
    private matDialog: MatDialogRef<WordFormComponent>
  ) {
    this.initializeForm();
  }

  

  async initializeForm() {
    this.wordForm = await this.fb.group({
      word: ['', Validators.required],
      clues: this.fb.array([])
    });

    if(this.data) {
      this.wordForm.patchValue({word: this.data.word});
      this.data.clues.forEach(clue => {
        this.clues.push(this.fb.group({
          clue: [clue.clue, Validators.required]
        }));
      });
  
      this.wordForm.updateValueAndValidity();
      
    }

    this.addClue(null);
    this.currentIndex = this.clues.length - 1;
  }

  get clues() {
    return this.wordForm.controls["clues"] as FormArray;
  }

  getClueControl(index: number) {
    return this.clues.at(index);
  }

  addClue(control?: AbstractControl | null, edit?: boolean) {
    const cluesForm = this.fb.group({
        clue: ['', Validators.required]
    });
  
    if((control === null || control?.valid) && !edit ) {
      this.clues.push(cluesForm);
      this.currentIndex = this.clues.length - 1;
    } else if(edit && control?.valid) {
      this.currentIndex = this.clues.length - 1;
      this.isEditing = false;
    }
  }

  deleteClue(clueIndex: number) {
    this.clues.removeAt(clueIndex);
    this.clues.updateValueAndValidity();
    this.currentIndex = this.clues.length - 1;
    this.isEditing = false;

  }

  editClue(index: number, element: HTMLTextAreaElement) {
    if(!this.clues.controls.some((formGroup, index) => index != this.clues.length - 1 && formGroup.invalid)) {
      this.currentIndex = index;
      setTimeout(() => {
        this.placeCaretAtEnd(element);
      });
      this.isEditing = true;
    }

  }

  drop(event: any) {
    if(event?.container?.data)
      moveItemInArray(this.clues.controls, event.previousIndex, event.currentIndex);
  }

  placeCaretAtEnd(el: HTMLTextAreaElement) {
    el.focus();
    el.setSelectionRange(el.value.length,el.value.length);
  }
  
  autoResize(element: HTMLTextAreaElement) {
      element.style.height = '0px';
      element.style.height = `${Math.max(this.textAreaDefaultHeight, element.scrollHeight)}px`;
  }

  get cluesValidity(): boolean {
    let length = this.clues.controls.length;
    return length < 2 ?? this.clues.controls.some((formControl, index) => index != length -1 ? formControl.invalid : false );
  }

  saveAction() {
    let clues = this.clues.controls.map(clue => clue.value);
    let formValues = {
      word: this.wordForm.get('word')?.value,
      clues
    };
    this.matDialog.close(formValues);
  }

  cancelAction() {
    this.matDialog.close(false);
  }
}
