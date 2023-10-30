/**
 * Базовый класс для доменных классов.
 */
export abstract class BaseListFilter {
  /**
   * Конвертировать клиентский объект доменной модели в объект, требуемый серверу.
   * @return Объект, требуемый серверу.
   */
  toServerObject(): Partial<any> {
    return null;
  }
}
