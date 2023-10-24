export interface BaseEnumData {
  name: string;
}

/**
 * Базовый класс для клиентских перечислений.
 */
export abstract class BaseEnum {

  /**
   * Значение перечисления.
   */
  abstract guid: any;
  /**
   * Наименование перечисления.
   */
  abstract name: string;

  /**
   * Конвертировать значение, полученное с сервера в клиентское перечисление.
   * @param _serverObject данные, полученные с сервера.
   */
  static toClientObject(_serverObject: any): BaseEnum {
    return null;
  }

  /**
   * Конвертировать клиентское перечисление для отправки на сервер.
   * @param baseEnum клиентское перечисление.
   */
  static toServerObject(baseEnum: any): any {
    if (!baseEnum) {
      return null;
    }
    if (baseEnum instanceof BaseEnum) {
      return baseEnum.guid;
    }
    return baseEnum;
  }

  toString(): string {
    return this.name;
  }
}
