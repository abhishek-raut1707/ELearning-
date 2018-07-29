import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentFindComponent } from './content-find/content-find.component';

import { ExpressionsRoutingModule } from './expressions-routing.module';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
 
@NgModule({
  imports: [
    CommonModule,
    ExpressionsRoutingModule,
    // MDBBootstrapModule.forRoot()
  ],
  declarations: [ContentFindComponent]
})
export class ExpressionsModule { }
