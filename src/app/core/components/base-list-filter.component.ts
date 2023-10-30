import { QueryList, Component, HostListener } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, merge } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BaseListRepository } from '../repositories/base-list-repository';
import { FormUtils } from '../utils/form-utils';
import { CustomFormControl } from './custom-form.control';

/**
 * Базовый класс для компонента фильтра таблицы
 */
@Component({ template: '' })
export abstract class BaseListFilterComponent {
 
  readonly tabsValidity$ = new BehaviorSubject<Map<string, boolean>>(null);

  abstract repository: BaseListRepository;
  abstract controlNames: any;
  abstract formGroup: FormGroup;

//  @HostListener('document:keyup.enter')
//  protected enterClick(): void {
//    this.repository.applyFilterSubject$.next();
//  }
  
  /**
   * Добавить контролы в форму
   * @param controls контролы
   */
  addControls(controls: { [p: string]: CustomFormControl | FormGroup | FormArray }): void {
    FormUtils.addControls(this.formGroup, controls);
  }

  /**
   * Получить контрол из формы.
   * @param controlName имя контрола.
   * @param formGroupName имя группы форм.
   */
  getControl(controlName: string, formGroupName: string = null): CustomFormControl {
    const formGroup = formGroupName ? FormUtils.getFormGroup(formGroupName, this.formGroup) : this.formGroup;
    return FormUtils.getControl(formGroup, controlName);
  }

  /**
   * Получить массив форм из форм.
   * @param arrayName имя массива форм.
   * @param formGroupName имя группы форм.
   */
  getFormArray(arrayName: string, formGroupName: string = null): FormArray {
    const formGroup = formGroupName ? FormUtils.getFormGroup(formGroupName, this.formGroup) : this.formGroup;
    return FormUtils.getFormArray(arrayName, formGroup);
  }

  /**
   * Преобразовать значения контролов формы в объект
   * @param filterClass конструктор класса фильтра
   * @param previous предыдущее значение фильтра
   */
  mapFormToFilter<T>(filterClass: new () => T, previous: T = null): T {
    return FormUtils.mapFormToObject(this.formGroup, filterClass, previous);
  }
  
}
