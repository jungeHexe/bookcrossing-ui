import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileCardComponent } from './component/profile-card/profile-card.component';
import {CoreModule} from "../core/core.module";


@NgModule({
  declarations: [
    ProfileCardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CoreModule
  ]
})
export class ProfileModule { }
