import { Component, Inject } from '@angular/core';
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {word: string},
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  

  async initializeForm() {
    this.wordForm = await this.fb.group({
      word: ['', Validators.required],
      clues: this.fb.array([])
    });

    if(!this.data?.word) this.addClue(null);
  }

  get clues() {
    return this.wordForm.controls["clues"] as FormArray;
  }

  getClueControl(index: number) {
    return this.clues.at(index);
  }

  addClue(control?: AbstractControl | null) {
    const cluesForm = this.fb.group({
        clue: ['', Validators.required]
    });
  
    if(control === null || control?.valid) {
      this.clues.push(cluesForm);
      this.currentIndex = this.clues.length - 1;
    }
  }

  deleteClue(clueIndex: number) {
    this.clues.removeAt(clueIndex);
  }

  logss(any: any) {
    console.log('any', any);
  }

  editClue(index: number) {
    this.currentIndex = index;
  }
}
