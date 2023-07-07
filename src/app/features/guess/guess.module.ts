import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessComponent } from './guess.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GuessComponent
  }
];

@NgModule({
  declarations: [
    GuessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GuessModule { }
