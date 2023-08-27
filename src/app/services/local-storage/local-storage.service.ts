import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  set(key: string, value: string | Object) { 
    let val: any = typeof(value == 'object') ? value = JSON.stringify(value) : value;
    localStorage.setItem(key, val);
  }

  get(key: string) {
    let item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
