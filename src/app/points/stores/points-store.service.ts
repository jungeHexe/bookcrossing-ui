import {Point} from "../domain/point.model";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PointsStoreService {
  points: Point[] = [];
}
