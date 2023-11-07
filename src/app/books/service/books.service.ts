import {Injectable} from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";
import { OperationResult } from "src/app/core/domain/operation-result.model";
import { SearchResult } from "src/app/core/interfaces/search-result";
import {EntityService} from "../../core/services/entity.service";
import {Book} from "../domain/book.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ErrorHandlerService} from "../../core/services/error-handler.service";
import {SERVER_URL} from "../../app.constants";
import {OperationStatus, OperationStatusEnum} from "../../core/enums/operation-status.enum";

@Injectable({providedIn: 'root'})
export class BooksService extends EntityService<Book> {

  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService,
  ) {
    super();
  }

  search(params: HttpParams): Observable<SearchResult<Book>> {
    return this.http.get(`${SERVER_URL}books/all`, {params})
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка книг')),
        map((response: any) => ({
          data: response,
          mapper: Book.toClientObject,
        })),
      );
  }
  get(id: string): Observable<Book> {
    return this.http.get(`${SERVER_URL}books/${id}`)
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка книг')),
        map((response: any) => Book.toClientObject(response)),
      );
  }
  create(entity: Book): Observable<OperationResult> {
    return this.http.post(`${SERVER_URL}books/create`, entity.toServerObject())
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при создании книги')),
        map((response: any) => OperationResult.toClientObject({status: OperationStatusEnum.Ok})),
        );
  }
  update(entity: Book): Observable<OperationResult> {
    return this.http.put(`${SERVER_URL}books/update`, entity.toServerObject())
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при обновлении книги')),
        map((response: any) => OperationResult.toClientObject({status: OperationStatusEnum.Ok})),
        );
  }
  delete(entities: any[]): Observable<OperationResult> {
      throw new Error("Method not implemented.");
  }
}
