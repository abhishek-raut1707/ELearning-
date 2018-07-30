import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentFindComponent } from './content-find/content-find.component';
import { ApiServiceService } from '../../services/api-service.service';
import { ExpressionsRoutingModule } from './expressions-routing.module';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    CommonModule,
    ExpressionsRoutingModule,
    // MDBBootstrapModule.forRoot()
  ],
  declarations: [ContentFindComponent],
  providers: [ApiServiceService]
})
export class ExpressionsModule { }
