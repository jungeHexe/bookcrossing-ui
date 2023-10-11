import {BaseDomain} from "../../core/domain/base-domain.model";
import {ObjectUtils} from "../../core/utils/object-utils";
import { Author } from "./author.model";
import { Genre } from "./genre.model";

/**
 * Модель "Книга"
 */
export class Book extends BaseDomain {
  name: string = null;
  description: string = null;
  rating: number = null;
  cover: string = null;
  genres: Genre[] = [];
  authors: Author[] = [];
  quantityRequests: number = null;
  quantityReviews: number = null;
  
  get cardTitle(): string {
    return `${this.authors?.map(o => o.toString())} «‎${this.name}»`;
  }
  
  get cardDescription(): string {
    return this.description.length > 450 ? this.description.slice(0, 450) + '...' : this.description;
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
    return new Book(serverObject);
  }
  
  toServerObject(): any {
    return {
      guid: this.guid,
      name: this.name,
      description: this.description,
      rating: this.rating,
      cover: this.cover,
      genres: this.genres?.map(o => o.guid),
      authors: this.authors?.map(o => o.guid),
    };
  }
}