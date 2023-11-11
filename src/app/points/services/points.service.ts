import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ErrorHandlerService} from "../../core/services/error-handler.service";
import {catchError, map, Observable, of} from "rxjs";
import {SearchResult} from "../../core/interfaces/search-result";
import {SERVER_URL} from "../../app.constants";
import {Point} from "../domain/point.model";

@Injectable({providedIn: 'root'})
export class PointsService {
  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService,
  ) {
  }

  search(): Observable<Point[]> {
    return this.http.get(`${SERVER_URL}bookcrossing-points/all`)
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка точек')),
        map((response: any) => response.items?.map((o: any) => Point.toClientObject(o))),
      );
  }
}
