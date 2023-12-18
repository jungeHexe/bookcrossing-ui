import {Injectable} from "@angular/core";
import {EntitiesListFilterStoreService} from "../../core/stores/entities-list-filter-store.service";
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "../../core/services/local-storage.service";
import {PostsListFilter} from "../domain/posts-list-filter.model";

@Injectable({ providedIn: 'root' })
export class PostsListFilterStoreService extends EntitiesListFilterStoreService<PostsListFilter> {

  private readonly filterKey = 'posts-list__filter';
  private readonly innerListFilter = new BehaviorSubject(new PostsListFilter());

  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {
    super();
    const savedFilter = this.localStorageService.getItem(this.filterKey);
    if (savedFilter) {
      const filter = new PostsListFilter(savedFilter);
      this.innerListFilter.next(filter);
    }
  }

  set filter(listFilter: PostsListFilter) {
    this.localStorageService.setItem(this.filterKey, listFilter);
    this.innerListFilter.next(listFilter);
  }

  get filter(): PostsListFilter {
    return this.innerListFilter.value;
  }
}
