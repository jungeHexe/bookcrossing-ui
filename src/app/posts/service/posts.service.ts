import {EntityService} from "../../core/services/entity.service";
import {Post} from "../domain/post.model";
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ErrorHandlerService} from "../../core/services/error-handler.service";
import {catchError, map, Observable} from "rxjs";
import {SearchResult} from "../../core/interfaces/search-result";
import {SERVER_URL} from "../../app.constants";
import {OperationResult} from "../../core/domain/operation-result.model";
import {OperationStatusEnum} from "../../core/enums/operation-status.enum";

@Injectable({providedIn: 'root'})
export class PostsService extends EntityService<Post> {
  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService,
  ) {
    super();
  }

  search(params: HttpParams): Observable<SearchResult<Post>> {
    return this.http.get(`${SERVER_URL}posts/all`, {params})
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка публикаций')),
        map((response: any) => ({
          data: response,
          mapper: Post.toClientObject,
        })),
      );
  }
  get(id: string): Observable<Post> {
    return this.http.get(`${SERVER_URL}posts/${id}`)
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении публикации')),
        map((response: any) => Post.toClientObject(response)),
      );
  }
  create(entity: Post): Observable<OperationResult> {
    return this.http.post(`${SERVER_URL}posts/create`, entity.toServerObject())
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при создании публикации')),
        map((response: any) => {
          if (response?.error) {
            return OperationResult.toClientObject({status: OperationStatusEnum.Failed});
          }
          return OperationResult.toClientObject({status: OperationStatusEnum.Ok});
        }),
      );
  }
  update(entity: Post): Observable<OperationResult> {
    return this.http.put(`${SERVER_URL}posts/update`, entity.toServerObject())
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при обновлении публикации')),
        map((response: any) => {
          if (response?.error) {
            return OperationResult.toClientObject({status: OperationStatusEnum.Failed});
          }
          return OperationResult.toClientObject({status: OperationStatusEnum.Ok});
        }),
      );
  }
  delete(entities: any[]): Observable<OperationResult> {
    return this.http.delete(`${SERVER_URL}posts/${entities[0].guid}`)
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении публикации')),
        map((response: any) => {
          if (response?.error) {
            return OperationResult.toClientObject({status: OperationStatusEnum.Failed});
          }
          return OperationResult.toClientObject({status: OperationStatusEnum.Ok});
        }),
      );
  }
}
