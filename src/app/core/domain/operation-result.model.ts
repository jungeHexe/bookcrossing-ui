import { OperationStatus } from "../enums/operation-status.enum";
import { ObjectUtils } from "../utils/object-utils";

/**
 * Универсальный класс для обработки результата операции на сервере.
 */
export class OperationResult {
  /**
   * Статус операции.
   */
  status: OperationStatus = null;
  /**
   * Идентификатор сущности.
   */
  entityId: string = null;
  /**
   * Ошибки при выполнении операции.
   */
  errors: string[] = [];

  constructor(operationResult: Partial<OperationResult> = null) {
    if (!operationResult) {
      return;
    }
    // Обычные поля
    ObjectUtils.constructorFiller(this, operationResult);
    // Клиентские объекты
    this.status = OperationStatus.toClientObject(operationResult.status);
  }

  static toClientObject<T>(serverObject: any): OperationResult {
    if (!serverObject) {
      return null;
    }
    return new OperationResult(serverObject);
  }
}
