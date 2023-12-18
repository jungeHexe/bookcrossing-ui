import {BaseListRepository} from "./base-list-repository";
import {PostsService} from "../../posts/service/posts.service";
import {PostsListFilterStoreService} from "../../posts/store/posts-list-filter-store.service";
import {map, Observable} from "rxjs";
import {Book} from "../../books/domain/book.model";
import {Post} from "../../posts/domain/post.model";
import {CommonDataService} from "../services/commom-data.service";
import {ObjectUtils} from "../utils/object-utils";

export class PostsInternalListRepository extends BaseListRepository {
  constructor(
    private readonly commonDataService: CommonDataService,
    private readonly bookId: string,
    private readonly userId: string,
  ) {
    super();
  }

  getData(): Observable<Book[]> {
    const params = this.generateHttpParams(ObjectUtils.removeNullFields({
      user_id: this.userId,
      book_id: this.bookId,
    }));

    return this.commonDataService.searchPosts(params)
      .pipe(map(response => this.mapContent<Post>(response.data, response.mapper)));
  }
}
