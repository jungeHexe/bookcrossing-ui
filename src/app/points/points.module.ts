import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { PointsRoutingModule } from './points-routing.module';
import { PointsListComponent } from './components/points-list/points-list.component';
import {AngularYandexMapsModule} from "angular8-yandex-maps";
import {Y_API_KEY} from "../app.constants";


@NgModule({
  declarations: [
    PointsListComponent
  ],
  imports: [
    AngularYandexMapsModule.forRoot({
      apikey: Y_API_KEY,
      lang: 'ru_RU',
    }),
    CoreModule,
    PointsRoutingModule,
  ]
})
export class PointsModule { }
