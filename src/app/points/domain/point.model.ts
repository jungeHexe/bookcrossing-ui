import { BaseDomain } from "../../core/domain/base-domain.model";
import {ObjectUtils} from "../../core/utils/object-utils";

export class Point extends BaseDomain {
  title: string = null;
  latitude: number = null;
  longitude: number = null;
  addressText: string = null;

  get ballon(): string {
    return `<b>${this.title}</b><br/>${this.addressText}`
  }
  constructor(entity: Partial<Point> = null) {
    super();
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
  }

  static toClientObject(serverObject: any): Point {
    if (!serverObject) {
      return null;
    }
    return new Point(ObjectUtils.objectToCamelCase(serverObject));
  }

  toServerObject(): any {
    return {
      title: this.title,
      longitude: this.longitude,
      latitude: this.latitude,
      addressText: this.addressText,
    };
  }

  toString(): string {
    return this.title;
  }
}
