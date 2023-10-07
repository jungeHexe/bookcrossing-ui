import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AppPathConstants} from "./app.constants";

const routes: Routes = [
  {
    path: AppPathConstants.EMPTY,
    component: AppComponent,
    children: [
      {
        path: 'about',
        component: AppComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
