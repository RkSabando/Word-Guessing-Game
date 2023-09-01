import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { RouterModule, Routes } from '@angular/router';
import { WordFormComponent } from './word-form/word-form/word-form.component';

// Materials
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';


const Materials = [
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
  MatDialogModule
];

// Routes
const routes: Routes = [
  {
    path: '',
    component: ManageComponent
  }
];

@NgModule({
  declarations: [
    ManageComponent,
    WordFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    Materials
  ]
})
export class ManageModule { }
