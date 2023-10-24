import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPathConstants, ObjectFormState } from '../app.constants';
import {BooksListComponent} from "./components/books-list/books-list.component";
import {BookCardComponent} from "./components/book-card/book-card.component";
import {BooksBreadcrumbs} from "./books.contants";
import { BookEditorResolver } from './resolver/book-editor.resolver';

const routes: Routes = [
  {
    path: AppPathConstants.EMPTY,
    //    canActivate: [AuthGuard],
    component: BooksListComponent,
  },
  {
    path: `${AppPathConstants.CREATE}`,
    component: BookCardComponent,
//  canActivate: [AuthGuard],
//  canDeactivate: [DirtyCheckGuard],
    data: {
      breadcrumb: {
        label: BooksBreadcrumbs.NEW_BOOK,
      },
      currentAction: ObjectFormState.CREATE,
    },
  },
  {
    path: `${AppPathConstants.EDIT}/${AppPathConstants.ID_PARAM}`,
    component: BookCardComponent,
    //  canActivate: [AuthGuard],
    //  canDeactivate: [DirtyCheckGuard],
    data: {
      breadcrumb: {
        label: BooksBreadcrumbs.EDIT_BOOK,
      },
      currentAction: ObjectFormState.EDIT,
    },
    resolve: {
      book: BookEditorResolver,
    },
  },
  {
    path: `${AppPathConstants.READ}/${AppPathConstants.ID_PARAM}`,
    component: BookCardComponent,
    //  canActivate: [AuthGuard],
    //  canDeactivate: [DirtyCheckGuard],
    data: {
      currentAction: ObjectFormState.READ,
    },
    resolve: {
      book: BookEditorResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
