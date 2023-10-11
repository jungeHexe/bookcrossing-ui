import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AppPathConstants} from "./app.constants";
import {LandingPageComponent} from "./landing-page/landing-page.component";

const routes: Routes = [
  {
    path: AppPathConstants.EMPTY,
    children: [
      {
        path: AppPathConstants.BOOKS,
//        canActivate: [LegalEntitiesGuard],
        loadChildren: () => import('./books/books.module')
              .then(m => m.BooksModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
