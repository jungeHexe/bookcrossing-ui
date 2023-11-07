import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppPathConstants} from "./app.constants";
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import {LandingPageComponent} from "./landing-page/landing-page.component";

const routes: Routes = [
  {
    path: AppPathConstants.EMPTY,
    children: [
      {
        path: AppPathConstants.EMPTY,
        component: LandingPageComponent,
      },
      {
        path: AppPathConstants.LOGIN,
        component: LoginComponent,
      },
      {
        path: AppPathConstants.BOOKS,
        canActivate: [AuthGuard],
        loadChildren: () => import('./books/books.module')
              .then(m => m.BooksModule),
      },
      {
        path: AppPathConstants.BOOKCROSSING_POINTS,
        canActivate: [AuthGuard],
        loadChildren: () => import('./points/points.module')
              .then(m => m.PointsModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
