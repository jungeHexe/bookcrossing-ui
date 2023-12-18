import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {SelectOption} from 'src/app/core/interfaces/select-option';
import {SelectorService, SelectorType} from 'src/app/core/services/selector.service';
import {CustomFormControl} from '../../custom-form.control';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {HttpParams} from "@angular/common/http";

@UntilDestroy()
@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputComponent implements OnInit {

  @Input() label = '';
  @Input() placeholder = 'Выберите значение';
  @Input() control?: CustomFormControl;
  @Input() clearable = true;
  @Input() multi = false;
  @Input() loading = false;
  @Input() selectorType: SelectorType = null;
  @Input() withServerSearch = true;

  options: SelectOption[];

  constructor(
    private selectorService: SelectorService,
  ) {
  }

  isRequired(): boolean {
    return this.control.isRequired();
  }

  ngOnInit() {
    this.selectorService.getData(this.selectorType, this.defaultParams())
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.options = value;
      });
  }

  defaultParams(): HttpParams {
    return new HttpParams().appendAll({page: 1, size: 100});
  }

  // todo поиск с фильтром по строке
}
