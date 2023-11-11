import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPathConstants } from '../app.constants';
import { AuthGuard } from '../core/guard/auth.guard';
import {PointsListComponent} from "./components/points-list/points-list.component";
import {PointsResolver} from "./resolvers/points.resolver";

const routes: Routes = [
  {
    path: AppPathConstants.EMPTY,
    canActivate: [AuthGuard],
    component: PointsListComponent,
    resolve: {
      data: PointsResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointsRoutingModule { }
