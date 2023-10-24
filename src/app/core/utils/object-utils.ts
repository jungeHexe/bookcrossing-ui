
/**
 * Класс утилитарных функций для объекта
 */
export class ObjectUtils {

  /**
   * Заполнить поля конструктора
   * @param objClass this конструктора
   * @param obj объект для переноса полей
   */
  static constructorFiller(objClass: any, obj: any): void {
    Object.entries(obj)
      .filter(([key, _]) => Object.prototype.hasOwnProperty.call(objClass, key))
      .forEach(([key, value]) => objClass[key] = value);
  }

  static objectToCamelCase(serverObject: any): any {
    let result: any = {};
    for (let key in serverObject) {
      if (serverObject.hasOwnProperty(key)) {
        result[key.replace(/(\_\w)/g, (el) =>  el[1].toUpperCase())] = serverObject[key];
      }
    }
    return result;
  }

  /**
   * Удалить из объекта все null/undefined поля
   * @param obj объект
   */
  static removeNullFields<T>(obj: T): Partial<T> {
    if (!obj) {
      return null;
    }
    const result: any = {};
    Object.entries(obj).forEach(e => {
      const key: string = e[0];
      const value: any = e[1];

      if (Array.isArray(value)) {
        if (value.length === 0) {
          return;
        } else {
          result[key] = value;
        }
      } else {
        if (value == null || value.value === null) {
          return;
        } else {
          if (value instanceof Object) {
            result[key] = this.removeNullFields(value);
          } else {
            result[key] = value;
          }
        }
      }
    });
    return result;
  }

  /**
   * Проверить равенство двух объектов
   * @param obj1 первый объект
   * @param obj2 второй объект
   */
  static deepEquals(obj1: any, obj2: any): boolean {
    if (!obj1 && !obj2) {
      return true;
    }
    if (!obj1 || !obj2) {
      return false;
    }
    // Проверяем на соответствие по всем ключам obj1 в obj2
    for (const [key, value] of Object.entries(obj1)) {
      if (!ObjectUtils.compareValue(value, obj2[key])) {
        return false;
      }
    }
    // Проверяем на соответствие по всем ключам obj2 в obj1
    for (const [key, value] of Object.entries(obj2)) {
      if (!ObjectUtils.compareValue(value, obj1[key])) {
        return false;
      }
    }
    // Проверяем на соответствие порядка ключей в объектах
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  /**
   * Проверить равенство двух массивов без учета порядка объектов
   * @param arr1 первый массив
   * @param arr2 второй массив
   */
  static compareArraysIgnoreOrder(arr1: any[], arr2: any[]): boolean {
    if (!arr1 && !arr2) {
      return true;
    }
    if (!arr1 || !arr2) {
      return false;
    }
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
      return false;
    }
    // при передаче параметров в compareArrays создадим новые массивы, чтобы не менять порядок исходных
    return this.compareArrays([...arr1], [...arr2]);
  }

  /**
   * Добавление элемента в массив.
   * @param array массив.
   * @param item элемент.
   * @return индекс элемента в массиве.
   */
  static addToArray(array: { guid: string }[], item: { guid: string }): number {
    const index = array.findIndex(o => o.guid === item.guid);
    if (index === -1) {
      array.push(item);
    } else {
      array.splice(index, 1, item);
    }
    return index;
  }

  /**
   * Удаление элементов из массива.
   * @param array массив.
   * @param items список удаляемых элементов.
   * @return индекс элемента в массиве.
   */
  static removeFromArray(array: any[], items: any[]): void {
    for (const item of items) {
      const index = array.findIndex(o => o.id === item.id);
      if (index !== -1) {
        array.splice(index, 1);
      }
    }
  }

  /**
   * Возвращает значение поля из вложенных объектов по строке, в которой поля разделены точкой
   * @param object объект
   * @param path путь до нужного значения
   */
  static getNestedProperty(object: any, path: string): any {
    if (!object || !path) {
      return null;
    }
    const splitPath = path.split('.');
    let result = object;
    splitPath.forEach(pathPart => {
      result = result ? result[pathPart] : null;
    });
    return result;
  }

  private static compareValue(data1: any, data2: any): boolean {
    if (data1 == null && data2 == null) {
      return true;
    }
    // Массив
    if (Array.isArray(data1)) {
      return this.compareArrays(data1, data2);
    } else {
      // Дата
      if (data1 instanceof Date) {
        if (data2 instanceof Date) {
          return data1.getTime() === data2.getTime();
        } else {
          return false;
        }
      } else {
        return this.compareObjects(data1, data2);
      }
    }
  }

  private static compareArrays(data1: any, data2: any): boolean {
    if (!Array.isArray(data2) || data1.length !== data2.length) {
      return false;
    }
    let array1ToCompare = data1;
    let array2ToCompare = data2;
    if (data1[0]?.id) {
//      array1ToCompare = SortUtils.sortByObjectPropertyName(data1, 'id');
//      array2ToCompare = SortUtils.sortByObjectPropertyName(data2, 'id');
    }
    for (const [index, value] of array1ToCompare.entries()) {
      if (!ObjectUtils.compareObjects(value, array2ToCompare[index])) {
        return false;
      }
    }
    return true;
  }

  private static compareObjects(data1: any, data2: any): boolean {
    // Объект/просто значение
    if (data1 instanceof Object && !(data2 instanceof Object)) {
      return false;
    }
    if (data2 instanceof Object && !(data1 instanceof Object)) {
      return false;
    }
    if (data1 instanceof Object && data2 instanceof Object) {
      return this.deepEquals(data1, data2);
    }
    return data1 === data2;
  }
}
