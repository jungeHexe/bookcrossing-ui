import {ChangeDetectionStrategy, Component } from '@angular/core';
import {BooksListRepository} from "../../domain/books-list-repository";
import {BooksListFilterStoreService} from "../../store/books-list-filter-store.service";
import {BooksService} from "../../service/books.service";
import { Book } from '../../domain/book.model';
import {AbstractList} from "../../../core/domain/abstract-list";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent extends AbstractList<Book> {

  constructor(
    router: Router,
    route: ActivatedRoute,
    private readonly listFilterStoreService: BooksListFilterStoreService,
    private readonly entityService: BooksService,
  ) {
    super(router, route);
    this.repository = new BooksListRepository(
      this.entityService,
      this.listFilterStoreService,
    );

  }

  getPage(page: number): void {
    this.loading = true;
    this.repository.paginationData.page = page;
    this.data$ = this.repository.getData();
  }

}
