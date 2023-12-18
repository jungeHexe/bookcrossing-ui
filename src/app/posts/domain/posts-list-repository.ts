import {BaseListRepository} from "../../core/repositories/base-list-repository";
import {map, Observable} from "rxjs";
import {Book} from "../../books/domain/book.model";
import {PostsService} from "../service/posts.service";
import {PostsListFilterStoreService} from "../store/posts-list-filter-store.service";
import {Post} from "./post.model";

export class PostsListRepository extends BaseListRepository {

  constructor(
    private readonly postsService: PostsService,
    private readonly listFilterStoreService: PostsListFilterStoreService,
  ) {
    super();
  }

  getData(): Observable<Book[]> {
    const params = this.generateHttpParams(this.listFilterStoreService.filter.toServerObject());

    return this.postsService.search(params)
      .pipe(map(response => this.mapContent<Post>(response.data, response.mapper)));
  }
}
