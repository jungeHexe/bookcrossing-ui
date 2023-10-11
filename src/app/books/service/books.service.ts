import {Injectable} from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";
import { OperationResult } from "src/app/core/domain/operation-result.model";
import { SearchResult } from "src/app/core/interfaces/search-result";
import {EntityService} from "../../core/services/entity.service";
import {Book} from "../domain/book.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ErrorHandlerService} from "../../core/services/error-handler.service";
import {SERVER_URL} from "../../app.constants";
import {Author} from "../domain/author.model";
import { Genre } from "../domain/genre.model";

@Injectable({providedIn: 'root'})
export class BooksService extends EntityService<Book> {
  
  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService,
  ) {
    super();
  }
  
  search(params: HttpParams): Observable<SearchResult<Book>> {
    console.log(params)
    return of({
      data: {
        items: [new Book({name: 'Джейн Эйр', authors: [new Author({surname: 'Бронте', name: 'Шарлота'})], genres: [new Genre({name: 'Классика'})], description: 'Роман известной английской писательницы Шарлотты Бронте – классика женской литературы. В нем есть все, от чего так замирает сердце: первое робкое чувство, обманутые надежды, верные друзья и настоящая любовь. Судьба героини трагична, но, несмотря на множество жизненных трудностей, Джейн находит в себе силы бороться за свое счастье!Роман известной английской писательницы Шарлотты Бронте – классика женской литературы. В нем есть все, от чего так замирает сердце: первое робкое чувство, обманутые надежды, верные друзья и настоящая любовь. Судьба героини трагична, но, несмотря на множество жизненных трудностей, Джейн находит в себе силы бороться за свое счастье!', cover: '/assets/images/image7.png', quantityRequests: 10, quantityReviews: 25 }), new Book({name: 'test', description: 'test'}), new Book({name: 'test', description: 'test'})],
        total: 3,
        page: 1,
        pages: 1,
        size: 1,
      },
      mapper: Book.toClientObject,
    });
    return this.http.get(`${SERVER_URL}books/all`, {params})
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка книг')),
        map((response: any) => ({
          data: response,
          mapper: Book.toClientObject,
        })),
        );
  }
  get(id: string): Observable<Book> {
      throw new Error("Method not implemented.");
  }
  create(entity: Book): Observable<OperationResult> {
      throw new Error("Method not implemented.");
  }
  update(entity: Book): Observable<OperationResult> {
      throw new Error("Method not implemented.");
  }
  delete(entities: any[]): Observable<OperationResult> {
      throw new Error("Method not implemented.");
  }
}