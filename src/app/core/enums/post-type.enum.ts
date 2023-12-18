import {BaseEnum, BaseEnumData} from "./base.enum";

export enum PostTypeEnum {
  Review = 'review',
  Other = 'other',
}

export class PostType extends BaseEnum {
  public static PostTypeDictionary = new Map<PostTypeEnum, BaseEnumData>([
    [PostTypeEnum.Review, { name: 'Рецензия' }],
    [PostTypeEnum.Other, { name: 'Прочее' }],
  ]);

  /**
   * Значение перечисления.
   */
  guid: PostTypeEnum;
  /**
   * Наименование перечисления.
   */
  name: string;

  constructor(postTypeEnum: PostTypeEnum) {
    super();
    if (!postTypeEnum) {
      return;
    }
    this.guid = postTypeEnum;
    this.name = PostType.PostTypeDictionary.get(postTypeEnum).name;
  }

  static toClientObject(serverObject: any): PostType {
    if (!serverObject || !PostType.PostTypeDictionary.has(serverObject)) {
      return null;
    }
    return new PostType(serverObject);
  }
}
