import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentEditorDirective } from './directives/content-editor/content-editor.directive';
import { AutoResizeDirective } from './directives/auto-resize/auto-resize.directive';


@NgModule({
  declarations: [
    AppComponent,
    ContentEditorDirective,
    AutoResizeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
