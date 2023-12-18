import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppPathConstants, ObjectFormState} from "../app.constants";
import {AuthGuard} from "../core/guard/auth.guard";
import {PostsListComponent} from "./components/posts-list/posts-list.component";
import {PostCardComponent} from "./components/post-card/post-card.component";
import {PostEditorResolver} from "./resolver/post-editor.resolver";
import {PostsConstants} from "./posts.constants";

const routes: Routes = [
  {
    path: AppPathConstants.EMPTY,
    canActivate: [AuthGuard],
    component: PostsListComponent,
  },
  {
    path: `${AppPathConstants.CREATE}`,
    component: PostCardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        label: PostsConstants.NEW_POST,
      },
      currentAction: ObjectFormState.CREATE,
    },
    resolve: {
      book: PostEditorResolver,
    }
  },
  {
    path: `${AppPathConstants.EDIT}/${AppPathConstants.ID_PARAM}`,
    component: PostCardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        label: PostsConstants.EDIT_POST,
      },
      currentAction: ObjectFormState.EDIT,
    },
    resolve: {
      book: PostEditorResolver,
    },
  },
  {
    path: `${AppPathConstants.READ}/${AppPathConstants.ID_PARAM}`,
    component: PostCardComponent,
    canActivate: [AuthGuard],
    data: {
      currentAction: ObjectFormState.READ,
    },
    resolve: {
      book: PostEditorResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
