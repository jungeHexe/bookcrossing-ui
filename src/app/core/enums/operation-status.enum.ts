import { BaseEnum, BaseEnumData } from "./base.enum";

export enum OperationStatusEnum {
  Ok = 'Ok',
  Failed = 'Failed',
}

export class OperationStatus extends BaseEnum {

  static OperationStatusDictionary = new Map<OperationStatusEnum, BaseEnumData>([
    [OperationStatusEnum.Ok, { name: 'Успех' }],
    [OperationStatusEnum.Failed, { name: 'Ошибка' }],
  ]);

  /**
   * Значение перечисления.
   */
  id: OperationStatusEnum;
  /**
   * Наименование перечисления.
   */
  name: string;

  constructor(operationStatusEnum: OperationStatusEnum) {
    super();
    if (!operationStatusEnum) {
      return;
    }
    this.id = operationStatusEnum;
    this.name = OperationStatus.OperationStatusDictionary.get(operationStatusEnum).name;
  }

  static toClientObject(serverObject: any): OperationStatus {
    if (!serverObject || !OperationStatus.OperationStatusDictionary.has(serverObject)) {
      return null;
    }
    return new OperationStatus(serverObject);
  }
}
