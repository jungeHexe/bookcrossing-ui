import { Author } from "src/app/core/domain/author.model";
import { Genre } from "src/app/core/domain/genre.model";
import {BaseDomain} from "../../core/domain/base-domain.model";
import {ObjectUtils} from "../../core/utils/object-utils";

export class BookControlNames {
  static readonly TITLE: keyof Book = 'title';
  static readonly DESCRIPTION: keyof Book = 'description';
  static readonly RATING: keyof Book = 'rating';
  static readonly PIC_FILE_NAME: keyof Book = 'picFileName';
  static readonly GENRES: keyof Book = 'genres';
  static readonly AUTHORS: keyof Book = 'authors';
}

/**
 * Модель "Книга"
 */
export class Book extends BaseDomain {
  title: string = null;
  description: string = null;
  rating: number = null;
  picFileName: string = null;
  genres: Genre[] = [];
  authors: Author[] = [];
  requests: any[] = [];
  reviews: any[] = [];

  get quantityRequests(): number {
    return this.requests?.length;
  }

  get quantityReviews(): number {
    return this.reviews?.length;
  }

  get cardTitle(): string {
    return `${this.authors?.map(o => o.toString()).join(', ')} "${this.title}"`;
  }

  get cardDescription(): string {
    return this.description.length > 450 ? this.description.slice(0, 450) + '...' : this.description;
  }

  get fullAuthorsNames(): string {
    return this.authors?.map(o => `${o.surname} ${o.name} ${o.patronymic}`).join(', ');
  }

  constructor(entity: Partial<Book> = null) {
    super();
    if (!entity) {
      return
    }
    ObjectUtils.constructorFiller(this, entity);
    this.genres = entity.genres?.map(o => Genre.toClientObject(o));
    this.authors = entity.authors?.map(o => Author.toClientObject(o));
  }

  static toClientObject(serverObject: any): Book {
    if (!serverObject) {
      return null;
    }
    return new Book(ObjectUtils.objectToCamelCase(serverObject));
  }

  toServerObject(): any {
    return {
      guid: this.guid,
      title: this.title,
      description: this.description,
      rating: this.rating,
      pic_file_name: this.picFileName,
      genres: this.genres?.map(o => o.guid),
      authors: this.authors?.map(o => o.guid),
    };
  }

}
