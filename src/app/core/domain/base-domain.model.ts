export abstract class BaseDomain {
  /**
   * Идентификатор объекта.
   */
  guid: string = null;
  /**
   * Наименование
   */
  name: string = null;
  /**
   * Признак существования объекта только на UI.
   */
  localObject = false;
  /**
   * Дата создания объекта.
   */
  createdAt: Date = null;

  /**
   * Конвертировать данные, полученные с сервера, в клиентский объект доменной модели.
   * @param _serverObject данные, полученные с сервера.
   */
  static toClientObject(_serverObject: any): BaseDomain {
    return null;
  }

  /**
   * Конвертировать клиентский объект доменной модели в объект, понятный серверу.
   */
  toServerObject(): any {
    return null;
  }

  /**
   * Конвертировать клиентский объект доменной модели в объект инпута, понятный серверу.
   * @param clientObject клиентский объект.
   */
  static toNestedObject(clientObject: BaseDomain): { id: string } | null {
    if (!clientObject) {
      return null;
    }
    return {
      id: clientObject.guid,
    };
  }
  
  toString(): string {
    return this.name;
  }
}