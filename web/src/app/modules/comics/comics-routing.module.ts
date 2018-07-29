import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComicsComponent } from './upload-comics/upload-comics.component';
import { ViewComicsComponent } from './view-comics/view-comics.component';

const routes: Routes = [
      
      {
        path: 'upload-comics',
        component: UploadComicsComponent
      },
      {
        path: 'view-comics',
        component: ViewComicsComponent
      }
];



@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ComicsRoutingModule { }
