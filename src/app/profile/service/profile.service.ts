import { Injectable } from "@angular/core";
import {EntityService} from "../../core/services/entity.service";
import {User} from "../../core/domain/user.model";
import {catchError, map, Observable} from "rxjs";
import {OperationResult} from "../../core/domain/operation-result.model";
import {SearchResult} from "../../core/interfaces/search-result";
import {SERVER_URL} from "../../app.constants";
import {HttpClient} from "@angular/common/http";
import {OperationStatusEnum} from "../../core/enums/operation-status.enum";
import {ErrorHandlerService} from "../../core/services/error-handler.service";

@Injectable({ providedIn: 'root' })
export class ProfileService extends EntityService<User> {

  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService,
  ) {
    super();
  }

  changePassword(): void {}

  update(entity: User): Observable<OperationResult> {
    return this.http.put(`${SERVER_URL}users/update`, entity.toServerObject())
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при обновлении профиля')),
        map((response: any) => OperationResult.toClientObject({status: OperationStatusEnum.Ok})),
      );
  }

  delete(entities: any[]): Observable<OperationResult> {
    return undefined;
  }

  create(entity: User): Observable<OperationResult> {
    return undefined;
  }

  get(id: string): Observable<User> {
    return this.http.get(`${SERVER_URL}users/${id}`)
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении данных пользователя')),
        map((response: any) => User.toClientObject(response)),
      );
  }

  search(filter: any): Observable<SearchResult<any>> {
    return undefined;
  }


}
