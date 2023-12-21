import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { RequestsListCardComponent } from './components/requests-list-card/requests-list-card.component';
import { RequestCardComponent } from './components/request-card/request-card.component';
import {CoreModule} from "../core/core.module";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    RequestsListComponent,
    RequestsListCardComponent,
    RequestCardComponent,
  ],
    imports: [
        CommonModule,
        RequestsRoutingModule,
        CoreModule,
        NgxPaginationModule
    ]
})
export class RequestsModule { }
