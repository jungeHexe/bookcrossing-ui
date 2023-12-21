import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppPathConstants, ObjectFormState} from "../app.constants";
import {AuthGuard} from "../core/guard/auth.guard";
import {RequestsListComponent} from "./components/requests-list/requests-list.component";
import {RequestCardComponent} from "./components/request-card/request-card.component";
import {RequestEditorResolver} from "./resolver/request-editor.resolver";
import {RequestsConstants} from "./requests.constants";

const routes: Routes = [
  {
    path: AppPathConstants.EMPTY,
    canActivate: [AuthGuard],
    component: RequestsListComponent,
  },
  {
    path: `${AppPathConstants.CREATE}`,
    component: RequestCardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        label: RequestsConstants.NEW_REQUEST,
      },
      currentAction: ObjectFormState.CREATE,
    },
    resolve: {
      book: RequestEditorResolver,
    }
  },
  {
    path: `${AppPathConstants.EDIT}/${AppPathConstants.ID_PARAM}`,
    component: RequestCardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        label: RequestsConstants.EDIT_REQUEST,
      },
      currentAction: ObjectFormState.EDIT,
    },
    resolve: {
      book: RequestEditorResolver,
    },
  },
  {
    path: `${AppPathConstants.READ}/${AppPathConstants.ID_PARAM}`,
    component: RequestCardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        label: RequestsConstants.EDIT_REQUEST,
      },
      currentAction: ObjectFormState.READ,
    },
    resolve: {
      book: RequestEditorResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
