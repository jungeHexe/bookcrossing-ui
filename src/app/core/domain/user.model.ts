import { ObjectUtils } from "../utils/object-utils";
import {BaseDomain} from "./base-domain.model";

export class UserControlNames {
  static readonly LOGIN: keyof User = 'login';
  static readonly PASSWORD: keyof User = 'password';
  static readonly REPEATED_PASSWORD: keyof User = 'repeatedPassword';
  static readonly ABOUT: keyof User = 'about';
  static readonly EMAIL: keyof User = 'email';
  static readonly AVATAR: keyof User = 'avatar';
  static readonly PHONE_NUMBER: keyof User = 'phoneNumber';
  static readonly NAME: keyof User = 'name';
}

export class User extends BaseDomain {
  login: string = null;
  password: string = null;
  repeatedPassword: string = null;
  about: string = null;
  email: string = null;
  avatar: string = null;
  phoneNumber: string = null;
  
  constructor(entity: Partial<User>) {
    super();
    if (!entity) {
      return
    }
    ObjectUtils.constructorFiller(this, entity);
  }

  static toClientObject(serverObject: any): User {
    if (!serverObject) {
      return null;
    }
    return new User(ObjectUtils.objectToCamelCase(serverObject));
  }

  toString(): string {
    return this.login ?? this.name;
  }

  toServerObject(): any {
    return {
      guid: this.guid,
      name: this.name,
      login: this.login,
      password: this.password,
      about: this.about,
      email: this.email,
      avatar: this.avatar,
      phone_num: this.phoneNumber,
    };
  }
}