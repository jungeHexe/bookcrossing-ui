import {BaseListFilter} from "../../core/domain/base-list-filter.model";
import {BooksListSortingEnum} from "./enums/books-list-sorting.enum";
import {ObjectUtils} from "../../core/utils/object-utils";
import {Genre} from "./genre.model";

export class BooksListFilterControlNames {
  static readonly AUTHOR_NAME: keyof BooksListFilter = 'authorName';
  static readonly BOOK_TITLE: keyof BooksListFilter = 'bookTitle';
  static readonly GENRES: keyof BooksListFilter = 'genres';
  static readonly ORDER_BY: keyof BooksListFilter = 'orderBy';
}

/**
 * Фильтр списка "Книги"
 */
export class BooksListFilter extends BaseListFilter {
  authorName: string = null;
  bookTitle: string = null;
  genres: Genre[] = [];
  orderBy: BooksListSortingEnum = null;
  
  constructor(filter: Partial<BooksListFilter> = null) {
    super();
    if (!filter) {
      return;
    }
    ObjectUtils.constructorFiller(this, filter);
    this.genres = filter.genres?.map(o => Genre.toClientObject(o)) ?? [];
  }
  
  toServerObject(): Partial<any> {
    const filter = {
      book_title: this.bookTitle,
      author_name: this.authorName,
      genre: this.genres?.map(o => o.name),
      order_by: this.orderBy,
    };
    console.log(ObjectUtils.removeNullFields(filter))
    return ObjectUtils.removeNullFields(filter);
  }
}