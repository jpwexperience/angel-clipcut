import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FilmComponent } from './film/film.component';
import { ClipComponent } from './clip/clip.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FilmComponent,
    ClipComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
