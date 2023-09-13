import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

export const guessGuard: CanActivateFn = (route, state) => {
  const storage = inject(LocalStorageService);
  const router = inject(Router);
  let words = storage.get('state')?.words;

  if(!(words && words.length)) {
    router.navigate(['manage']);
    return false;
  }

  return true;
};
