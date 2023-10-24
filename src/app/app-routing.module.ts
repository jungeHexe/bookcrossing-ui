import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppPathConstants} from "./app.constants";

const routes: Routes = [
  {
    path: AppPathConstants.EMPTY,
    children: [
      {
        path: AppPathConstants.BOOKS,
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
