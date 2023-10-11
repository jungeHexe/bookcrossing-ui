import { UntilDestroy } from '@ngneat/until-destroy';
import { Sorting, SortType } from '../interfaces/sorting';
import { Pagination } from '../interfaces/pagination';
import {BehaviorSubject, Observable} from "rxjs";
import {PageData} from "../interfaces/page-data";
import {PaginationData} from "../interfaces/pagination-data";
import { BaseDomain } from '../domain/base-domain.model';
import {HttpParams} from "@angular/common/http";

/**
 * Базовый класс для репозитория таблицы gas-table
 */
export abstract class BaseListRepository {
  
  readonly paginationData$ = new BehaviorSubject<PaginationData>({perPage: 10});
  
  protected constructor() {}
  
  get paginationData() {
    return this.paginationData$.value;
  }
  
  set paginationData(paginationData: PaginationData) {
    this.paginationData$.next(paginationData);
  }
  
  abstract getData(): Observable<any[]>;

  /**
   * Получить пагинацию для отправки запроса на сервер
   */
  getPagination(): Pagination {
    return {
      page: this.paginationData.page - 1,
      size: this.paginationData.perPage,
    };
  }

  /**
   * Обработать ответ от сервера
   * @param data ответ от сервера
   * @param mapper маппер в клиентский объект
//   */
  protected mapContent<T>(data: PageData<T>, mapper: (serverObject: any) => T): any[] {
    // Отметим общее количество элементов
    this.paginationData.total = data?.total ?? 0;
    // Если данные для отображения есть
    if (this.paginationData.total > 0) {
      // Проверим текущую страницу
      const lastPage = Math.ceil(this.paginationData.total / this.paginationData.perPage);
      // Если данных не хватает на текущую страницу
      if (this.paginationData.page > lastPage) {
        this.paginationData = {
          ...this.paginationData,
          page: lastPage,
        };
        return [];
      }
      return data.items.map(o => mapper(o));
    }
    return [];
  }
  
  generateHttpParams(filter: any): HttpParams {
    let queryParams = new HttpParams().appendAll(this.getPagination() as any);
    queryParams = queryParams.appendAll(filter);
    return queryParams;
  }

}
