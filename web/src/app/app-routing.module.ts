import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppContainerComponent } from './layouts/app-layout/app-container/app-container.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
// import { AppCustomPreloader } from './app-custom-preloader';
import { ContentFindComponent } from './modules/expressions/content-find/content-find.component';


const routes: Routes = [
  {
    path: '',
    component: AppContainerComponent,
    children: [
      {
        path: '',
        redirectTo: '/home', pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: './modules/home/home.module#HomeModule',
       
      },
      {
        path: 'expressions',
        loadChildren: './modules/expressions/expressions.module#ExpressionsModule',
        
      },
      {
        path: 'comics',
        loadChildren: './modules/comics/comics.module#ComicsModule',
        
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule',
        
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
