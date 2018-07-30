import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [UploadComicsComponent, ViewComicsComponent]
})
export class ComicsModule { }
