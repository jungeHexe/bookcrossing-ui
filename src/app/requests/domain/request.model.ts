import {BaseDomain} from "../../core/domain/base-domain.model";
import {User} from "../../core/domain/user.model";
import {Point} from "../../points/domain/point.model";
import {Book} from "../../books/domain/book.model";
import {RequestStatus, RequestStatusEnum} from "./enum/request-status.enum";
import {ObjectUtils} from "../../core/utils/object-utils";
import {DateUtils} from "../../core/utils/date-utils";

export class RequestControlNames {
  static readonly POINT: keyof Request = 'point';
  static readonly BOOK: keyof Request = 'book';
  static readonly STATUS: keyof Request = 'status';
}

export class Request extends BaseDomain {
  point: Point = null;
  user: User = null;
  book: Book = null;
  status: RequestStatusEnum = RequestStatusEnum.Active;

  constructor(entity: Partial<Request> = null) {
    super();
    if (!entity) {
      return
    }
    ObjectUtils.constructorFiller(this, entity);
    this.book = Book.toClientObject(entity.book);
    this.createdAt = DateUtils.toDate(entity.createdAt);
    this.point = Point.toClientObject(entity.point);
    this.user = User.toClientObject(entity.user);
  }

  static toClientObject(serverObject: any): Request {
    if (!serverObject) {
      return null;
    }
    return new Request(ObjectUtils.objectToCamelCase(serverObject));
  }

  toServerObject(): any {
    return {
      guid: this.guid,
      book_id: this.book?.guid,
      point_id: this.point?.guid,
      status: RequestStatus.toServerObject(this.status),
      user_id: this.user?.guid,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  toString(): string {
    return super.toString();
  }
}
