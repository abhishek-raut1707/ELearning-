import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppContainerComponent } from './app-layout/app-container/app-container.component';
import { AppContentComponent } from './app-layout/app-content/app-content.component';
import { HeadersComponent } from './app-layout/headers/headers.component';
import { FootersComponent } from './app-layout/footers/footers.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ContentFindComponent } from '../modules/expressions/content-find/content-find.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MDBBootstrapModule.forRoot(),

  ],
  declarations: [
    AppContainerComponent,
    AppContentComponent,
    HeadersComponent,
    FootersComponent,
    AuthLayoutComponent,
    
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LayoutModule { }
