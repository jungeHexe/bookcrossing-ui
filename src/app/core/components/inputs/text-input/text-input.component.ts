import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomFormControl} from "../../custom-form.control";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent {

  @Input() label = '';
  @Input() placeholder = 'Введите значение';
  @Input() nativeElement: 'input' | 'textarea' = 'input';
  @Input() control = new CustomFormControl();
  @Input() disabled = false;
  @Input() maxLength: number = 10**10;
  @Input() minLength: number = 1;
  
  @Output() onBlur = new EventEmitter<FocusEvent>();
  
}
