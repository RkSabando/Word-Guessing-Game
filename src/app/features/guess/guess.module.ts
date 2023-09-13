import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessComponent } from './guess.component';
import { RouterModule, Routes } from '@angular/router';
import { KeyboardComponent } from './keyboard/keyboard/keyboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: GuessComponent
  }
];

const materials = [
  MatDialogModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
]

@NgModule({
  declarations: [
    GuessComponent,
    KeyboardComponent
  ],
  imports: [
    CommonModule,
    materials,
    RouterModule.forChild(routes)
  ]
})
export class GuessModule { }
