import {BaseDomain} from "../../core/domain/base-domain.model";
import {ObjectUtils} from "../../core/utils/object-utils";

/**
 * Модель "Автор"
 */
export class Author extends BaseDomain {
  /**
   * Фамилия
   */
  surname: string = null;
  /**
   * Имя
   */
  patronymic: string = null;
  
  constructor(entity: Partial<Author> = null) {
    super();
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
  }
  
  static toClientObject(serverObject: any): Author {
    if (!serverObject) {
      return null;
    }
    return new Author(serverObject);
  }
  
  toServerObject(): any {
    return {
      guid: this.guid,
      surname: this.surname,
      name: this.name,
      patronymic: this.patronymic,
    };
  }
  
  toString(): string {
    return `${this.name[0].toUpperCase()}. ${this.surname}`;
  }
}