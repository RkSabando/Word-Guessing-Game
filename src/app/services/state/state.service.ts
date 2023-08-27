import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() {}
  wordsSubject = new BehaviorSubject([]);
  words$ = this.wordsSubject.asObservable();


}
