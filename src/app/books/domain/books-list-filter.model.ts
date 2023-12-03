import {BaseListFilter} from "../../core/domain/base-list-filter.model";
import {ObjectUtils} from "../../core/utils/object-utils";
import { Genre } from "src/app/core/domain/genre.model";
import {BooksListSorting } from "src/app/core/enums/books-list-sorting.enum";

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
  orderBy: BooksListSorting = null;

  constructor(filter: Partial<BooksListFilter> = null) {
    super();
    if (!filter) {
      return;
    }
    ObjectUtils.constructorFiller(this, filter);
    this.genres = filter.genres?.map(o => Genre.toClientObject(o)) ?? [];
    this.orderBy = BooksListSorting.toClientObject(filter.orderBy?.guid ?? filter.orderBy);
  }

  toServerObject(): Partial<any> {
    const filter = {
      book_title: this.bookTitle,
      author_name: this.authorName,
      genre_guids: this.genres?.map(o => o.guid),
      order_by: this.orderBy?.guid,
    };
    return ObjectUtils.removeNullFields(filter);
  }
}
