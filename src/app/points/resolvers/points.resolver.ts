import {Injectable} from "@angular/core";
import {PointsService} from "../services/points.service";
import {PointsStoreService} from "../stores/points-store.service";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import Point = ymaps.geometry.Point;
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class PointsResolver implements Resolve<Point[]> {

  constructor(
    private readonly pointsService: PointsService,
    private readonly pointsStoreService: PointsStoreService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.pointsService.search()
      .pipe(tap(value => {
        this.pointsStoreService.points = value ?? [];
      }));
  }
}
