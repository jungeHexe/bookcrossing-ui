import { Component, Input } from '@angular/core';
import { SelectOption } from 'src/app/core/interfaces/select-option';
import { CustomFormControl } from '../../custom-form.control';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent {

  @Input() label = '';
  @Input() placeholder = 'Выберите значение';
  @Input() control?: CustomFormControl;
  @Input() options: ReadonlyArray<SelectOption> = [];
  @Input() clearable = true;
  @Input() multi = false;
  @Input() loading = false;
}
