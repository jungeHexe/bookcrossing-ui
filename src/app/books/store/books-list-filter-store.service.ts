import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import {EntitiesListFilterStoreService} from "../../core/stores/entities-list-filter-store.service";
import {BooksListFilter} from "../domain/books-list-filter.model";

@Injectable({ providedIn: 'root' })
export class BooksListFilterStoreService extends EntitiesListFilterStoreService<BooksListFilter> {
  
  private readonly filterKey = 'books-list__filter';
  private readonly innerListFilter = new BehaviorSubject(new BooksListFilter());

  constructor(
    private readonly localStorageService: LocalStorageService,
    ) {
    super();
    const savedFilter = this.localStorageService.getItem(this.filterKey);
    if (savedFilter) {
      const filter = new BooksListFilter(savedFilter);
      this.innerListFilter.next(filter);
    }
  }

  set filter(listFilter: BooksListFilter) {
    this.localStorageService.setItem(this.filterKey, listFilter);
    this.innerListFilter.next(listFilter);
  }

  get filter(): BooksListFilter {
    return this.innerListFilter.value;
  }
}