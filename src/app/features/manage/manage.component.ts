import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { StateService, Word } from 'src/app/services/state/state.service';
import { WordFormComponent } from './word-form/word-form/word-form.component';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageComponent implements OnInit, OnDestroy {

  words$: Observable<Word[]> = this.state.words$;
  letters$: Observable<{[key: string]: number}> = this.state.letters$;
  tabIndex: number = 0;
  dialogRef$: any;
  vm: any;
  currentLetter = '';

  constructor(
    private storage: LocalStorageService,
    private state: StateService,
    private dialog: MatDialog
  ){
    this.vm = this.storage.get('state');
  }

  async ngOnInit() {
    await this.initializeWords();
    await this.initializeLetters();
  }

  async initializeWords() {
    if(this.vm?.words) {
      this.state.wordsSubject.next(this.vm.words);
    } else {
      let obj = {
          words: [],
          ...this.vm
      };
      this.state.wordsSubject.next([]);
      this.vm = obj;
      this.updateWords();
    }
  }

  async initializeLetters() {
    if(this.vm?.letters) {
      this.state.lettersSubject.next(this.vm.letters);
    } else {
      let obj = {
          ...this.vm,
          letters: this.state.lettersSubject.getValue()
      };
      this.vm = obj;
      this.storage.set('state', obj);
    }
  }

  ngOnDestroy(): void {
    this.dialogRef$?.unsubscribe();
  }

  clickAdd(item: Word | null | undefined = null) {
    let dialogRef = this.dialog.open(WordFormComponent, {
      data: item ?? null
    });
    this.dialogRef$ = dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          data.clues = data.clues.filter((d: any) => d.clue !== '');
          let wordIndex = this.vm?.words?.findIndex((w: any) => w.word === data.word);
          if(wordIndex >= 0) {
            this.vm.words[wordIndex] = Object.assign({},data);
          } else {
            this.vm?.words.unshift(data);
          }

          this.updateWords();
        }
      }
    )
  }

  deleteWord(index: number): void {
    let dialogRef = this.dialog.open(RemoveWordComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.vm.words.splice(index, 1);
        this.updateWords();
      }
    });
  }

  updateWords() {
    this.storage.set('state', this.vm);
    this.state.wordsSubject.next(this.vm.words);
  }

  updateLetters() {
    this.storage.set('state', this.vm);
    this.state.lettersSubject.next(this.vm.letters);
  }

  editLetters() {
    this.tabIndex = this.tabIndex ? 0 : 1;
  }

  editLetter(item: KeyValue<string, number>, element: HTMLElement) {
    this.currentLetter = item.key;
    element.focus();
  }

  onBlur(item: KeyValue<string, number>, element: HTMLElement) {
    if(this.currentLetter === item.key) {
      element.focus();
    }
  }

  changeLetterValue(item: KeyValue<string, number>, element: HTMLInputElement) {
    const lowestValue = 1;
    let letters = this.state.lettersSubject.getValue();
    letters[item.key] = Math.max(lowestValue,parseInt(element.value));
    
    this.vm = {
      ...this.vm,
      letters: Object.assign({}, letters)
    }
    
    this.updateLetters();
    this.currentLetter = '';
  }

}

@Component({
  template: `
  <h2 mat-dialog-title><span class="font-bold">Delete Word</span></h2>
  <mat-dialog-content>
    <div class="py-3 text-gray-700">
      Are you sure you want to delete this item?
    </div>
  </mat-dialog-content>
  <mat-dialog-actions>
    <div class="w-full flex justify-end p-3">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">Delete</button>
    </div>
  </mat-dialog-actions>`,
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
}) 
export class RemoveWordComponent {}
