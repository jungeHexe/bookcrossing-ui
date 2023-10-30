import {BaseListRepository} from "src/app/core/repositories/base-list-repository";
import { map, Observable } from "rxjs";
import { Book } from "./book.model";
import { BooksService } from "../service/books.service";
import { BooksListFilterStoreService } from "../store/books-list-filter-store.service";

export class BooksListRepository extends BaseListRepository {
  
  constructor(
    private readonly booksService: BooksService,
    private readonly listFilterStoreService: BooksListFilterStoreService,
  ) {
    super();
  }
  
  getData(): Observable<Book[]> {
    const params = this.generateHttpParams(this.listFilterStoreService.filter.toServerObject());
    
    return this.booksService.search(params)
             .pipe(map(response => this.mapContent<Book>(response.data, response.mapper)));
  }
}