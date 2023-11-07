import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {PointsStoreService} from "../../stores/points-store.service";
import {YaReadyEvent} from "angular8-yandex-maps";
import SearchControl = ymaps.control.SearchControl;

@Component({
  selector: 'app-points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.scss']
})
export class PointsListComponent {

  selectedItem: number = null;

  placemarkOptions: ymaps.IPlacemarkOptions = {
    iconLayout: 'default#image',
    iconImageHref:
      'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconImageSize: [32, 32],
  };

  constructor(
    readonly pointsStoreService: PointsStoreService,
  ) { }

  activatePoint(id: number): void {
    this.selectedItem = id;
  }
}
