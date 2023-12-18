import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, of } from "rxjs";
import { SERVER_URL } from "src/app/app.constants";
import { Genre } from "../domain/genre.model";
import { ErrorHandlerService } from "./error-handler.service";
import {SelectOption} from "../interfaces/select-option";
import {BooksListSorting} from "../enums/books-list-sorting.enum";
import { Author } from "../domain/author.model";
import {PostType} from "../enums/post-type.enum";
import {Book} from "../../books/domain/book.model";

export type SelectorType = 'genre' | 'book_sort' | 'author' | 'book' | 'post_type' | null;

@Injectable({ providedIn: 'root' })
export class SelectorService {

  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  getData(type: SelectorType, params: any = null): Observable<SelectOption[]> {
    switch (type) {
      case "genre":
        return this.getGenres();
      case "book_sort":
        return this.getBookSortings();
      case "author":
        return this.getAuthors(params);
      case "post_type":
        return this.getPostTypes();
      case "book":
        return this.getBooks(params);
      default:
        return of([]);
    }
  }

  private getGenres(): Observable<SelectOption[]> {
    return this.http.get(`${SERVER_URL}genres/all`)
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка жанров')),
        map((response: any) =>  response));
  }

  private getBookSortings(): Observable<SelectOption[]> {
    const options: SelectOption[] = [];
    BooksListSorting.BooksListSortingDictionary.forEach((enumData, enumValue) => {
      this.pushOption(options, enumData, enumValue);
    });
    return of(options);
  }

  private getPostTypes(): Observable<SelectOption[]> {
    const options: SelectOption[] = [];
    PostType.PostTypeDictionary.forEach((enumData, enumValue) => {
      this.pushOption(options, enumData, enumValue);
    });
    return of(options);
  }

  private getAuthors(params: any): Observable<SelectOption[]> {
    return this.http.get(`${SERVER_URL}authors/all`, {params})
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка авторов')),
        map((response: any) => {
          const options: SelectOption[] = [];
          response.items?.forEach((value: any) => {
            this.pushOption(options, {name: [Author.toClientObject(value).toString()].join(' ')}, value.guid);
          });
          return options;
        }));
  }

  private getBooks(params: any): Observable<SelectOption[]> {
    return this.http.get(`${SERVER_URL}books/all`, {params})
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка книг')),
        map((response: any) => {
          const options: SelectOption[] = [];
          response.items?.forEach((value: any) => {
            this.pushOption(options, {name: Book.toClientObject(value).cardTitle}, value.guid);
          });
          return options;
        }));
  }

  /**
   * Добавить опцию для выбора в массив.
   */
  protected pushOption(options: SelectOption[], enumData: Partial<{ name: string }>, enumValue: any): void {
    options.push({
      guid: enumValue,
      name: enumData.name,
    });
  }
}
