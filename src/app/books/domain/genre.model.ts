import {BaseDomain} from "../../core/domain/base-domain.model";
import {ObjectUtils} from "../../core/utils/object-utils";

/**
 * Модель "Жанр"
 */
export class Genre extends BaseDomain {
  
  constructor(entity: Partial<Genre>) {
    super();
    if (!entity) {
      return
    }
    ObjectUtils.constructorFiller(this, entity);
  }
  
  static toClientObject(serverObject: any): Genre {
    if (!serverObject) {
      return null;
    }
    return new Genre(serverObject);
  }
  
  toServerObject(): any {
    return {
      guid: this.guid,
      name: this.name,
    };
  }
}