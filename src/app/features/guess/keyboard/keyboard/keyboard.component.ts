import { TitleCasePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, HostListener, Inject, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Letter } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  constructor(
    private dialog: MatDialog
  ){}
  @Input() letters: Letter | null = {};
  @Input() currentWord: string = '';
  @Output() selectionChange = new EventEmitter<string>();
  @Output() actionChange = new EventEmitter<string>();
  
  @HostListener('document:keyup', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if(this.allowInput && !this.settingsOpened) {
      if(this.letters && this.letters[event.key]) {
        this.selectLetter(event.key);
      } else if(event.key === 'Escape') {
        this.settingsOpened = true;
        let dialogRef = this.dialog.open(ShowMenuComponent);
        dialogRef.afterClosed().subscribe( result => {

          switch(result) {
            case 'show':
              this.showAllLetters();
              break;
            
            case 'reset': 
              this.reset();
              break;

            case 'next': 
              this.reset(true);
              break;
          }
          setTimeout(() => {
            this.settingsOpened = false;
          },500)
        });
      }
    }
  } 

  settingsOpened = false;
  selectedLetters: string[] = [];
  wrongLetters: string[] = [];
  allowInput: boolean = true;

  selectLetter(letter: string) {
    if(!this.letterIncluded(letter) && this.allowInput) {
      this.showLetter(letter);
    }
  }

  letterIncluded(letter: string) {
    return this.selectedLetters.includes(letter);
  }

  showLetter(letter: string) {
    if(this.allowInput) {
      this.allowInput = false;
      let dialogRef = this.dialog.open(LetterModalComponent, {
        data: {letter},
        hasBackdrop: true,
        disableClose: true
      });
  
      setTimeout(() => {
        dialogRef.close();
        this.selectedLetters.push(letter);
        this.selectionChange.next(letter);
        if(!this.currentWord.includes(letter)) {
          this.wrongLetters.push(letter)
        }
        this.allowInput = true;
      },1000)
    }
  }

  checkWrongLetter(letter: string): boolean {
    return this.wrongLetters.includes(letter);
  }

  showAllLetters() {
    let letters = Array.from(this.currentWord);
    letters.forEach(letter => {
      if(!this.letterIncluded(letter)) {
        this.selectedLetters.push(letter);
        this.selectionChange.next(letter);
      }
    });
    
    this.actionChange.next('show');
  }

  reset(next: boolean = false) {
    this.selectedLetters= [];
    this.wrongLetters = [];
    this.actionChange.next(next ? 'next' : 'reset');
  }
}

@Component({
  template: `<div class="flex w-16 h-16 justify-center items-center bg-white text-4xl font-bold text-gray-700">{{ data.letter | titlecase }}</div>`,
  imports: [TitleCasePipe],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LetterModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {letter: string}
  ){}
}

@Component({
  template: `
  <div class="flex justify-center items-stretch gap-4 flex-col bg-white p-4 px-6 font-bold text-gray-700">
    <button (click)="action('show')" mat-flat-button color="primary" class="p-2">Show Word</button>
    <button (click)="action('reset')" mat-flat-button color="primary" class="p-2">Reset</button>
    <button (click)="action('next')" mat-flat-button color="primary" class="p-2">Next Word</button>
  </div>
  `,
  imports: [TitleCasePipe, MatButtonModule],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShowMenuComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {letter: string},
    private dialogRef: MatDialogRef<ShowMenuComponent>
    ){}
    action(action: string) {
        this.dialogRef.close(action);
    }
  }
