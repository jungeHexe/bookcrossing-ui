import {BaseListFilter} from "../../core/domain/base-list-filter.model";
import {Book} from "../../books/domain/book.model";
import {PostType, PostTypeEnum} from "../../core/enums/post-type.enum";
import {ObjectUtils} from "../../core/utils/object-utils";

export class PostsListFilterControlNames {
  static readonly TYPE: keyof PostsListFilter = 'type';
  static readonly BOOK: keyof  PostsListFilter = 'book';
}

export class PostsListFilter extends BaseListFilter {
  userId: string = null;
  book: Book = null;
  type: PostType = null;

  constructor(filter: Partial<PostsListFilter> = null) {
    super();
    if (!filter) {
      return;
    }
    ObjectUtils.constructorFiller(this, filter);
    this.book = Book.toClientObject(filter.book);
    this.type = PostType.toClientObject(filter.type?.guid ?? filter.type);
  }

  toServerObject(): Partial<any> {
    const filter = {
      user_id: this.userId,
      book_id: this.book?.guid,
      type: PostType.toServerObject(this.type),
    };
    return ObjectUtils.removeNullFields(filter);
  }
}
