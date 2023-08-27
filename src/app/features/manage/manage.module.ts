import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { RouterModule, Routes } from '@angular/router';

// Materials
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

const Materials = [
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTabsModule
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
    ManageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Materials
  ]
})
export class ManageModule { }
