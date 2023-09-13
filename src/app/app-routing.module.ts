import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { guessGuard } from './guards/guess/guess.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/guess/guess.module').then(m => m.GuessModule),
    canActivate: [guessGuard]
  },
  {
    path: 'manage',
    loadChildren: () => import('./features/manage/manage.module').then(m => m.ManageModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
