import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from './layouts/layout.module';
import { AppRoutingModule } from './app-routing.module';

import { ApiServiceService } from '../app/services/api-service.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    LayoutModule,
    AppRoutingModule
  ],
  providers: [ ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
