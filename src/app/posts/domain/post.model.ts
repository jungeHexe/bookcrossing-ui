import {BaseDomain} from "../../core/domain/base-domain.model";
import {Book} from "../../books/domain/book.model";
import {PostType} from "../../core/enums/post-type.enum";
import {ObjectUtils} from "../../core/utils/object-utils";
import {User} from "../../core/domain/user.model";
import {DateUtils} from "../../core/utils/date-utils";
import {UserStoreService} from "../../core/stores/user-store.service";

export class PostControlNames {
  static readonly TITLE: keyof Post = 'title';
  static readonly CONTENT: keyof Post = 'content';
  static readonly IMAGE: keyof Post = 'image';
  static readonly BOOK_RATING: keyof Post = 'bookRating';
  static readonly TYPE: keyof Post = 'type';
  static readonly BOOK: keyof Post = 'book';
}

export class Post extends BaseDomain {
  title: string = null;
  content: string = null;
  image: string = null;
  bookRating: number = null;
  type: PostType = null;
  book: Book = null;
  user: User = null;
  likesCount: number = null;
  comments: any[] = [];

  get quantityComments(): number {
    return this.comments?.length;
  }

  constructor(entity: Partial<Post> = null) {
    super();
    if (!entity) {
      return
    }
    ObjectUtils.constructorFiller(this, entity);
    this.book = Book.toClientObject(entity.book);
    this.type = PostType.toClientObject(entity.type?.guid ?? entity.type);
    this.createdAt = DateUtils.toDate(entity.createdAt);
    this.updatedAt = DateUtils.toDate(entity.updatedAt);
    this.user = User.toClientObject(entity.user);
  }

  static toClientObject(serverObject: any): Post {
    if (!serverObject) {
      return null;
    }
    return new Post(ObjectUtils.objectToCamelCase(serverObject));
  }

  toServerObject(): any {
    return {
      guid: this.guid,
      title: this.title,
      content: this.content,
      book_rating: this.bookRating,
      image: this.image,
      book: this.book?.toServerObject(),
      type: PostType.toServerObject(this.type),
      user: this.user?.toServerObject(),
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

}
