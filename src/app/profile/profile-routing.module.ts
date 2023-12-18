import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppPathConstants, ObjectFormState} from "../app.constants";
import {AuthGuard} from "../core/guard/auth.guard";
import {ProfileCardComponent} from "./component/profile-card/profile-card.component";
import {ProfileConstants} from "./profile.constants";
import {ProfileResolver} from "./resolver/profile.resolver";

const routes: Routes = [
  {
    path: `${AppPathConstants.EMPTY}${AppPathConstants.ID_PARAM}`,
    canActivate: [AuthGuard],
    component: ProfileCardComponent,
    data: {
      currentAction: ObjectFormState.READ,
    },
    resolve: {
      profile: ProfileResolver,
    }
  },
  {
    path: `${AppPathConstants.EDIT}/${AppPathConstants.ID_PARAM}`,
    component: ProfileCardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        label: ProfileConstants.EDIT_PROFILE,
      },
      currentAction: ObjectFormState.EDIT,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
