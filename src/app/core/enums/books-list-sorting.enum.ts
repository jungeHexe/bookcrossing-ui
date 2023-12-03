import {BaseEnum, BaseEnumData} from "./base.enum";

export enum BooksListSortingEnum {
  RatingAsc = '+rating',
  RatingDesc = '-rating',
  TitleAsc = '+title',
  TitleDesc = '-title',
}

export class BooksListSorting extends BaseEnum {
  public static BooksListSortingDictionary = new Map<BooksListSortingEnum, BaseEnumData>([
    [BooksListSortingEnum.RatingAsc, { name: 'По возрастанию рейтинга' }],
    [BooksListSortingEnum.RatingDesc, { name: 'По убыванию рейтинга' }],
    [BooksListSortingEnum.TitleAsc, { name: 'По названию А-Я' }],
    [BooksListSortingEnum.TitleDesc, { name: 'По названия Я-А' }],
    ]);

  /**
   * Значение перечисления.
   */
  guid: BooksListSortingEnum;
  /**
   * Наименование перечисления.
   */
  name: string;

  constructor(countryFilterEnum: BooksListSortingEnum) {
    super();
    if (!countryFilterEnum) {
      return;
    }
    this.guid = countryFilterEnum;
    this.name = BooksListSorting.BooksListSortingDictionary.get(countryFilterEnum).name;
  }

  static toClientObject(serverObject: any): BooksListSorting {
    if (!serverObject || !BooksListSorting.BooksListSortingDictionary.has(serverObject)) {
      return null;
    }
    return new BooksListSorting(serverObject);
  }
}
