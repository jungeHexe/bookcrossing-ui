import {BaseEnum, BaseEnumData} from "../../../core/enums/base.enum";

export enum BooksListSortingEnum {
  RequestsCount = 'RequestsCount',
  ReviewsCounts = 'ReviewsCounts',
  CreatedAt = 'createdAt',
}

export class BooksListSorting extends BaseEnum {
  public static BooksListSortingDictionary = new Map<BooksListSortingEnum, BaseEnumData>([
    [BooksListSortingEnum.RequestsCount, { name: 'По количеству объявлений' }],
    [BooksListSortingEnum.ReviewsCounts, { name: 'По количеству рецензий' }],
    [BooksListSortingEnum.CreatedAt, { name: 'По дате создания' }],
    ]);

  /**
   * Значение перечисления.
   */
  id: BooksListSortingEnum;
  /**
   * Наименование перечисления.
   */
  name: string;
  
  constructor(countryFilterEnum: BooksListSortingEnum) {
    super();
    if (!countryFilterEnum) {
      return;
    }
    this.id = countryFilterEnum;
    this.name = BooksListSorting.BooksListSortingDictionary.get(countryFilterEnum).name;
  }

  static toClientObject(serverObject: any): BooksListSorting {
    if (!serverObject || !BooksListSorting.BooksListSortingDictionary.has(serverObject)) {
      return null;
    }
    return new BooksListSorting(serverObject);
  }
}