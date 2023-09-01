import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})
export class WordFormComponent {
  wordForm: FormGroup = new FormGroup([]);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {word: string},
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  

  async initializeForm() {
    this.wordForm = await this.fb.group({
      word: [''],
      clues: this.fb.array([])
    });

    if(!this.data?.word) this.addClue();
  }

  get clues() {
    return this.wordForm.controls["clues"] as FormArray;
  }

  addClue() {
    const cluesForm = this.fb.group({
        clue: ['', Validators.required]
    });
  
    this.clues.push(cluesForm);
  }

  deleteClue(clueIndex: number) {
    this.clues.removeAt(clueIndex);
  }
}
