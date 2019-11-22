import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { VideoQueueComponent } from './video-queue/video-queue.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    VideoQueueComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
