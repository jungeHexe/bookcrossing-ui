import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseDomain } from '../domain/base-domain.model';
import { EntityService } from '../services/entity.service';
import { NavigationService } from '../services/navigation.service';
import { EntityStoreService } from '../stores/entity-store.service';

export class EntityEditorResolver<T extends BaseDomain> implements Resolve<T> {

  constructor(
    protected readonly navigationService: NavigationService,
    protected readonly entityService: EntityService<T>,
    protected readonly generalEntityStoreService: EntityStoreService<T>,
    protected readonly internalEntityStoreService: EntityStoreService<T> = null) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<T> | Promise<T> | T {
    const id = route.paramMap.get('id');
    const local = route.queryParamMap.get('local');
    const entityStoreService = route.data?.isInternalEditor
      ? this.internalEntityStoreService
      : this.generalEntityStoreService;
    // При открытии отображаем дефолтное состояние редактора
    entityStoreService.pageState$.next(null);
    // Если передан идентификатор объекта
    if (id) {
      // Загружаем объект, если данных нет
      if (entityStoreService.loadedEntity?.guid !== id && !local) {
        return this.entityService.get(id)
          .pipe(
            catchError(() => {
              this.navigationService.navigateBack();
              return EMPTY;
            }),
            tap((entity: T) => {
              entityStoreService.loadedEntity = entity;
              entityStoreService.resetActiveTab();
            }),
          );
      }
    } else {
      // Если в редакторе ещё не работали - сбрасываем активную вкладку/шаг степпера
      if (entityStoreService.entity == null || entityStoreService.loadedEntity?.guid !== entityStoreService.entity.guid) {
        entityStoreService.resetActiveTab();
      } else {
        entityStoreService.loadedEntity = null;
      }
    }
    return entityStoreService.loadedEntity;
  }
}
