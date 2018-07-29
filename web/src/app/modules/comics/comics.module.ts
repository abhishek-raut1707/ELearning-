import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComicsComponent } from './upload-comics/upload-comics.component';
import { ViewComicsComponent } from './view-comics/view-comics.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ComicsRoutingModule } from './comics-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    CommonModule,
    ComicsRoutingModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [UploadComicsComponent, ViewComicsComponent]
})
export class ComicsModule { }
