import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {SearchResult} from "../interfaces/search-result";
import {Post} from "../../posts/domain/post.model";
import {SERVER_URL} from "../../app.constants";
import {ErrorHandlerService} from "./error-handler.service";

@Injectable({ providedIn: 'root' })

export class CommonDataService {

  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService,
  ) {
  }
  searchPosts(params: HttpParams): Observable<SearchResult<Post>> {
    return this.http.get(`${SERVER_URL}posts/all`, {params})
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка публикаций')),
        map((response: any) => ({
          data: response,
          mapper: Post.toClientObject,
        })),
      );
  }
}
