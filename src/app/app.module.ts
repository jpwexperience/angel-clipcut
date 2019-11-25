import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { VideoQueueComponent } from './video-queue/video-queue.component';
import { ClipQueueComponent } from './clip-queue/clip-queue.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    VideoQueueComponent,
    ClipQueueComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
