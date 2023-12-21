import {BaseEnum, BaseEnumData} from "../../../core/enums/base.enum";

export enum RequestStatusEnum {
  Active = 'active',
  Completed = 'completed',
}

export class RequestStatus extends BaseEnum {
  public static RequestStatusDictionary = new Map<RequestStatusEnum, BaseEnumData>([
    [RequestStatusEnum.Active, { name: 'Активно' }],
    [RequestStatusEnum.Completed, { name: 'Закрыто' }],
  ]);

  /**
   * Значение перечисления.
   */
  guid: RequestStatusEnum;
  /**
   * Наименование перечисления.
   */
  name: string;

  constructor(requestStatusEnum: RequestStatusEnum) {
    super();
    if (!requestStatusEnum) {
      return;
    }
    this.guid = requestStatusEnum;
    this.name = RequestStatus.RequestStatusDictionary.get(requestStatusEnum).name;
  }

  static toClientObject(serverObject: any): RequestStatus {
    if (!serverObject || !RequestStatus.RequestStatusDictionary.has(serverObject)) {
      return null;
    }
    return new RequestStatus(serverObject);
  }
}
