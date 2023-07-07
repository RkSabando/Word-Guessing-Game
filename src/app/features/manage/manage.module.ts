import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { RouterModule, Routes } from '@angular/router';


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
    RouterModule.forChild(routes)
  ]
})
export class ManageModule { }
