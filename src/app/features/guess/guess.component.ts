import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { StateService, Word } from 'src/app/services/state/state.service';

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('1s ease-in', style({opacity: 1})),
]);

const fadeIn = trigger('fadeIn', [enterTransition]);

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss'],
  animations: [fadeIn]
})
export class GuessComponent implements OnInit {
  vm: any;
  currentWordIndex:number = 0;
  unguessedWordsIndex: number[] = [];
  currentWord: Word | null = null;
  currentWordLetters: any[] = [];
  loading: boolean = false;
  selectedLetters: string[] = [];
  clueIndex:number = 0;
  score: number = 0;

  constructor(
    private state: StateService,
    private storage: LocalStorageService
  ){
    this.vm = this.storage.get('state');
  }

  ngOnInit(): void {
    this.initializeWords();
    this.initializeLetters();
  }

  async initializeWords() {
    if(this.vm?.words) {
      this.state.wordsSubject.next(this.vm.words);
      this.unguessedWordsIndex = Array.from({ length: this.vm.words.length }, (value, index) => index);
      this.getRandomWord();
    } else {
      let obj = {
          words: []
      };

      this.storage.set('state', obj);
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

      this.storage.set('state', obj);
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  getRandomWord() {
    this.currentWordIndex = this.getRandomInt(this.vm.words.length);
    this.currentWord = this.vm.words[this.currentWordIndex];
    if(this.currentWord) {
      let word = this.currentWord.word.split(' ');
      word.forEach(w => {
        this.currentWordLetters.push(Array.from(w));
      })
    }
  }

  checkLetter(letter: string): boolean {
    return this.selectedLetters.includes(letter.toLowerCase());
  }

  changeSelection(event: any) {
    this.selectedLetters.push(event.toLowerCase());
    let pattern = new RegExp(event, 'ig');
    let occurences = (this.currentWord?.word?.match(pattern) || []).length;
    
    this.score += Number.isNaN(occurences * parseInt(this.vm?.letters[event])) ? 0 : occurences * parseInt(this.vm?.letters[event]);
  }

  nextClue() {
    if(this.clueIndex < this.currentWord!.clues.length - 1) {
      this.clueIndex++;
    } else {
      this.clueIndex = 0;
    }
  }

  action(action: string) {
    switch (action) {
      case  'reset':
        this.reset();
        break;
      case 'next':
        this.nextWord();
        break;

    }
  }

  reset(next: boolean = false) {
    this.score = 0;
    this.selectedLetters = [];
    if(next) {
      this.currentWordLetters = [];
      this.getRandomWord();
    };
  }

  async nextWord() {
    if(this.vm.words.length >= 2) {
      await this.vm.words.splice(this.currentWordIndex, 1);
      this.reset(true);
    }
  }
}
