import { AbstractControl } from '@angular/forms';
import { DateUtils } from '../utils/date-utils';
import { StringUtils } from '../utils/string-utils';

export const defaultMessages = {
  onlyDigits: 'Допустимы только цифры без разделителей',
  onlyDigitsAndPeriod: 'Допустимы только цифры и символ "."',
  maxLength: (max: number): string => `Максимальное число символов: ${max}`,
  maxValue: (max: number): string => `Значение должно быть не больше ${max}`,
  minValue: (min: number): string => `Значение должно быть не меньше ${min}`,
  maxAmountLength: (max: number): string => `Максимальное число цифр до запятой: ${max}`,
  minLength: (min: number): string => `Минимальное число символов: ${min}`,
  exactLength: (length: number): string => `Поле должно содержать ${length} ${StringUtils.noun(length, 'цифру', 'цифры', 'цифр')}`,
  exactLengthArray: (length: number, lengthString: string): string =>
    `Поле должно содержать ${lengthString} ${StringUtils.noun(length, 'цифру', 'цифры', 'цифр')}`,
  maxDecimals: (max: number): string => `Максимальное число знаков после запятой: ${max}`,
  beforeOrEqualsDate: (max: Date): string => `Дата не может быть позднее ${DateUtils.formatToRussianDateOnly(max)}`,
  afterOrEqualsDate: (min: Date): string => `Дата не может быть ранее ${DateUtils.formatToRussianDateOnly(min)}`,
  beforeOrEqualsDateTime: (max: Date): string => `Дата не может быть позднее ${DateUtils.formatToRussianDateTime(max)}`,
  afterOrEqualsDateTime: (min: Date): string => `Дата не может быть ранее ${DateUtils.formatToRussianDateTime(min)}`,
  lowerOrEquals: 'Укажите меньше значения "до"',
  greaterOrEquals: 'Укажите больше значения "от"',
  beforeOrEqualsDateLinked: 'Укажите меньше "даты по"',
  afterOrEqualsDateLinked: 'Укажите больше "даты с"',
  onlyDigitsAndComma: 'Допустимы только цифры и ","',
  onlyDigitsCommaAndMinus: 'Допустимы только цифры, "," и "-" перед числом',
  date: 'Введена некорректная дата',
};

export const validators = {
  onlyDigits: () => ((control: AbstractControl): any => {
    const value: string = control.value;
    if (!value) {
      return null;
    }
    const re = /^\d+$/;
    if (re.test(value)) {
      return null;
    }
    return error('onlyDigits', defaultMessages.onlyDigits);
  }),
  onlyDigitsAndPeriod: () => ((control: AbstractControl): any => {
    const value: string = control.value;
    if (!value) {
      return null;
    }
    const re = /^[\d.]+$/;
    if (re.test(value)) {
      return null;
    }
    return error('onlyDigits', defaultMessages.onlyDigitsAndPeriod);
  }),
  maxLength: (max: number, message: string = null) => ((control: AbstractControl): any => {
    const value: string = control.value?.toString();
    if (!value || value.length <= max) {
      return null;
    }
    return error('maxLength', message || defaultMessages.maxLength(max));
  }),
  minLength: (min: number, message: string = null) => ((control: AbstractControl): any => {
    const value: string = control.value;
    if (!value || min <= 0 || value?.length >= min) {
      return null;
    }
    return error('minLength', message || defaultMessages.minLength(min));
  }),
  maxValue: (max: number, message: string = null) => ((control: AbstractControl): any => {
    const value: string = control.value;
    if (!value || Number(value) <= max) {
      return null;
    }
    return error('maxValue', message || defaultMessages.maxValue(max));
  }),
  minValue: (min: number, message: string = null) => ((control: AbstractControl): any => {
    const value: string = control.value;
    if (!value || Number(value) >= min) {
      return null;
    }
    return error('minValue', message || defaultMessages.minValue(min));
  }),
  exactLength: (length: number, message: string = null) => ((control: AbstractControl): any => {
    const value: string = control.value;
    if (!value || value.length === length) {
      return null;
    }
    return error('exactLength', message || defaultMessages.exactLength(length));
  }),
  exactLengthArray: (lengths: number[], message: string = null) => ((control: AbstractControl): any => {
    const value: string = control.value;
    if (!value || lengths.includes(value.length)) {
      return null;
    }
    return error('exactLength', message || defaultMessages.exactLengthArray(lengths[0], lengths.join(' или ')));
  }),
  date: () => ((control: AbstractControl): any => {
    const value: string = control.value;
    if (!value) {
      return null;
    }
    if (DateUtils.isDate(value)) {
      return null;
    }
    return error('date', defaultMessages.date);
  }),
  beforeOrEqualsDate: (dateFn: () => any, messageFn: () => string = null) => ((control: { value: any }): any => {
    const value = DateUtils.toDate(control?.value);
    const date = DateUtils.toDate(dateFn());
    // Пока даты не введены, валидацию не делаем
    if (!value || !date || DateUtils.isDateBeforeOrEqualsOtherDate(value, date)) {
      return null;
    }
    return error('beforeOrEqualsDate', messageFn ? messageFn() : defaultMessages.beforeOrEqualsDate(dateFn()));
  }),
  afterOrEqualsDate: (dateFn: () => any, messageFn: () => string = null) => ((control: { value: any }): any => {
    const value = DateUtils.toDate(control?.value);
    const date = DateUtils.toDate(dateFn());
    // Пока даты не введены, валидацию не делаем
    if (!value || !date || DateUtils.isDateAfterOrEqualsOtherDate(value, date)) {
      return null;
    }
    return error('afterOrEqualsDate', messageFn ? messageFn() : defaultMessages.afterOrEqualsDate(dateFn()));
  }),
  beforeOrEqualsDateTime: (dateFn: () => any, messageFn: () => string = null) => ((control: { value: any }): any => {
    const value = DateUtils.toDate(control?.value);
    const date = DateUtils.toDate(dateFn());
    // Пока даты не введены, валидацию не делаем
    if (!value || !date || DateUtils.isDateTimeBeforeOrEqualsOtherDateTime(value, date)) {
      return null;
    }
    return error('beforeOrEqualsDateTime', messageFn ? messageFn() : defaultMessages.beforeOrEqualsDateTime(dateFn()));
  }),
  afterOrEqualsDateTime: (dateFn: () => any, messageFn: () => string = null) => ((control: { value: any }): any => {
    const value = DateUtils.toDate(control?.value);
    const date = DateUtils.toDate(dateFn());
    // Пока даты не введены, валидацию не делаем
    if (!value || !date || DateUtils.isDateTimeAfterOrEqualsOtherDateTime(value, date)) {
      return null;
    }
    return error('afterOrEqualsDateTime', messageFn ? messageFn() : defaultMessages.afterOrEqualsDateTime(dateFn()));
  }),
  beforeOrEqualsDateLinked: (dateFn: () => any, messageFn: () => string = null) => ((control: { value: any }): any => {
    const value = DateUtils.toDate(control?.value);
    const date = DateUtils.toDate(dateFn());
    // Пока даты не введены, валидацию не делаем
    if (!value || !date || DateUtils.isDateBeforeOrEqualsOtherDate(value, date)) {
      return null;
    }
    return error('beforeOrEqualsDateLinked', messageFn ? messageFn() : defaultMessages.beforeOrEqualsDateLinked);
  }),
  afterOrEqualsDateLinked: (dateFn: () => any, messageFn: () => string = null) => ((control: { value: any }): any => {
    const value = DateUtils.toDate(control?.value);
    const date = DateUtils.toDate(dateFn());
    // Пока даты не введены, валидацию не делаем
    if (!value || !date || DateUtils.isDateAfterOrEqualsOtherDate(value, date)) {
      return null;
    }
    return error('afterOrEqualsDateLinked', messageFn ? messageFn() : defaultMessages.afterOrEqualsDateLinked);
  }),
  lowerOrEquals: (dataFn: () => any, messageFn: () => string = null) => ((control: { value: any }): any => {
    const value = control?.value;
    const data = dataFn();

    if (!value || !data || +value <= +data) {
      return null;
    }
    return error('lowerOrEquals', messageFn ? messageFn() : defaultMessages.lowerOrEquals);
  }),
  greaterOrEquals: (dataFn: () => any, messageFn: () => string = null) => ((control: { value: any }): any => {
    const value = control?.value;
    const data = dataFn();

    if (!value || !data || +value >= +data) {
      return null;
    }
    return error('greaterOrEquals', messageFn ? messageFn() : defaultMessages.greaterOrEquals);
  }),
};

function error(name: string, message: string): any {
  return { [name]: { message } };
}
