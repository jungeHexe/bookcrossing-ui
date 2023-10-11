import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPathConstants } from '../app.constants';
import {BooksListComponent} from "./components/books-list/books-list.component";

const routes: Routes = [
  {
    path: AppPathConstants.EMPTY,
//    canActivate: [AuthGuard],
    component: BooksListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
