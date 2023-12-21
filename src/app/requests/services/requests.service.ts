import {EntityService} from "../../core/services/entity.service";
import {Request} from "../domain/request.model";
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ErrorHandlerService} from "../../core/services/error-handler.service";
import {catchError, map, Observable} from "rxjs";
import {SearchResult} from "../../core/interfaces/search-result";
import {SERVER_URL} from "../../app.constants";
import {OperationResult} from "../../core/domain/operation-result.model";
import {OperationStatusEnum} from "../../core/enums/operation-status.enum";

@Injectable({providedIn: 'root'})
export class RequestsService extends EntityService<Request> {
  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService,
  ) {
    super();
  }

  search(params: HttpParams): Observable<SearchResult<Request>> {
    return this.http.get(`${SERVER_URL}book-requests/all`, {params})
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка объявлений о книгах')),
        map((response: any) => ({
          data: response,
          mapper: Request.toClientObject,
        })),
      );
  }
  get(id: string): Observable<Request> {
    return this.http.get(`${SERVER_URL}book-requests/${id}`)
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении объявления')),
        map((response: any) => Request.toClientObject(response)),
      );
  }
  create(entity: Request): Observable<OperationResult> {
    return this.http.post(`${SERVER_URL}book-requests/create`, entity.toServerObject())
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при создании объявления')),
        map((response: any) => {
          if (response?.error) {
            return OperationResult.toClientObject({status: OperationStatusEnum.Failed});
          }
          return OperationResult.toClientObject({status: OperationStatusEnum.Ok});
        }),
      );
  }
  update(entity: Request): Observable<OperationResult> {
    return this.http.put(`${SERVER_URL}book-requests/update`, entity.toServerObject())
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при обновлении объявления')),
        map((response: any) => {
          if (response?.error) {
            return OperationResult.toClientObject({status: OperationStatusEnum.Failed});
          }
          return OperationResult.toClientObject({status: OperationStatusEnum.Ok});
        }),
      );
  }
  delete(entities: Request[]): Observable<OperationResult> {
    return this.http.delete(`${SERVER_URL}book-requests/${entities[0].guid}`)
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении объявления')),
        map((response: any) => {
          if (response?.error) {
            return OperationResult.toClientObject({status: OperationStatusEnum.Failed});
          }
          return OperationResult.toClientObject({status: OperationStatusEnum.Ok});
        }),
      );
  }
}
