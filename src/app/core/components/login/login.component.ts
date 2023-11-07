import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {User, UserControlNames } from '../../domain/user.model';
import {LoginFormStoreService} from "../../stores/login-form-store.service";
import {CustomFormControl} from "../custom-form.control";
import {FormUtils} from "../../utils/form-utils";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {BehaviorSubject, distinctUntilChanged} from "rxjs";
import {validators} from "../../services/validation.service";
import {AuthentificationService} from "../../services/authentification.service";
import {Router} from "@angular/router";
import { AppPathConstants } from 'src/app/app.constants';
import {first} from "rxjs/operators";
import {UserStoreService} from "../../stores/user-store.service";
import {AlertService} from "../../services/alert.service";

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, AfterViewInit {

  readonly CONTROL_NAMES = UserControlNames;
  readonly formGroup = new FormGroup({});
  readonly isLoading$ = new BehaviorSubject<boolean>(false);
  
  readonly isRegistrationForm$ = new BehaviorSubject<boolean>(false);
  
  constructor(
    private readonly router: Router,
    readonly loginFormStoreService: LoginFormStoreService,
    private readonly authentificationService: AuthentificationService,
    private readonly alertService: AlertService,
  ) { }

  ngOnInit(): void {
    const controls = {
      [this.CONTROL_NAMES.NAME]: new CustomFormControl(),
      [this.CONTROL_NAMES.EMAIL]: new CustomFormControl(),
      [this.CONTROL_NAMES.LOGIN]: new CustomFormControl(null, [
        Validators.required,
      ]),
      [this.CONTROL_NAMES.PASSWORD]: new CustomFormControl(null, [
        Validators.required,
      ]),
      [this.CONTROL_NAMES.REPEATED_PASSWORD]: new CustomFormControl(),
    };
    FormUtils.addControls(this.formGroup, controls);
  }

  ngAfterViewInit() {
    this.formGroup.valueChanges
      .pipe(
        distinctUntilChanged(),
        untilDestroyed(this),
      )
      .subscribe(() => {
        const object = FormUtils.mapFormToObject(this.formGroup, User);
        this.loginFormStoreService.registrationForm = new User(object);
        this.loginFormStoreService.loginForm = { login: object.login, password: object.password };
      });
  }
  
  register(): void {
    if (!FormUtils.deepValidateForm(this.formGroup)) {
      return;
    }
    if (!this.checkPasswordFields()) {
      this.alertService.showNotification('error', 'Пароли в полях "Пароль" и "Повтор пароля" не совпадают');
      return;
    }
    this.isLoading$.next(true);
    this.authentificationService.register(this.loginFormStoreService.registrationForm)
      .pipe(first(), untilDestroyed(this))
      .subscribe((value) => {
        this.isLoading$.next(false);
        if (value) {
          this.isRegistrationForm$.next(false);
        }
      });
  }
  
  login(): void {
    if (!FormUtils.deepValidateForm(this.formGroup)) {
      return;
    }
    this.isLoading$.next(true);
    this.authentificationService.login(this.loginFormStoreService.loginForm)
      .pipe(untilDestroyed(this))
      .subscribe((value: User) => {
        this.isLoading$.next(false);
        if (value) {
          UserStoreService.setUser(value);
          this.router.navigate([AppPathConstants.BOOKS]).then();
        }
      });
  }
  
  checkPasswordFields(): boolean {
    return this.loginFormStoreService.registrationForm.password === this.loginFormStoreService.registrationForm.repeatedPassword;
  }
  
  getControl(controlName: string): CustomFormControl {
    return FormUtils.getControl(this.formGroup, controlName);
  }
  
}