import {Injectable} from "@angular/core";
import {PointsService} from "../services/points.service";
import {PointsStoreService} from "../stores/points-store.service";
import {ActivatedRouteSnapshot} from "@angular/router";

@Injectable({providedIn: 'root'})
export class PointsResolver {

  constructor(
    private readonly pointsService: PointsService,
    private readonly pointsStoreService: PointsStoreService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): void {
    this.pointsService.search()
      .subscribe(value => {
        this.pointsStoreService.points = value ?? [];
      });
  }
}
