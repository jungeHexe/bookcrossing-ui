import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BaseEditorComponent} from "../../../core/components/base-editor.component";
import {User, UserControlNames} from "../../../core/domain/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../../core/services/navigation.service";
import {ProfileService} from "../../service/profile.service";
import {ProfileStoreService} from "../../store/profile-store.service";
import {distinctUntilChanged} from "rxjs";
import {untilDestroyed} from "@ngneat/until-destroy";
import {FormUtils} from "../../../core/utils/form-utils";
import {FileUtils} from "../../../core/utils/file-utils";
import {CustomFormControl} from "../../../core/components/custom-form.control";
import {Validators} from "@angular/forms";
import {UserStoreService} from "../../../core/stores/user-store.service";
import {AppPathConstants} from "../../../app.constants";
import {AuthentificationService} from "../../../core/services/authentification.service";
import {OperationStatusEnum} from "../../../core/enums/operation-status.enum";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent extends BaseEditorComponent<User> implements OnInit, AfterViewInit {

  readonly CONTROL_NAMES = UserControlNames;

  constructor(
    router: Router,
    route: ActivatedRoute,
    navigationService: NavigationService,
    readonly profileService: ProfileService,
    readonly profileStoreService: ProfileStoreService,
    private readonly authService: AuthentificationService,
  ) {
    super(router, route, navigationService, profileService, profileStoreService);

    if (!this.entityStoreService.loadedEntity) {
      this.entityStoreService.loadedEntity = new User(this.entityStoreService.entity ?? {
        localObject: true,
      });
    }

    if (this.entityStoreService.loadedEntity && !this.entityStoreService.entity) {
      this.entityStoreService.entity = new User(this.entityStoreService.loadedEntity);
    }

    this.listUrl = AppPathConstants.PROFILE;
  }

  ngOnInit(): void {
    const entity = this.entityStoreService.entity;
    const controls = {
      [this.CONTROL_NAMES.NAME]: new CustomFormControl(entity.name, [
        Validators.required,
      ]),
      [this.CONTROL_NAMES.ABOUT]: new CustomFormControl(entity.about),
      [this.CONTROL_NAMES.AVATAR]: new CustomFormControl(entity.avatar, [
        Validators.required,
      ]),
      [this.CONTROL_NAMES.EMAIL]: new CustomFormControl(entity.email),
      [this.CONTROL_NAMES.NEW_PASSWORD]: new CustomFormControl(entity.newPassword),
      [this.CONTROL_NAMES.PASSWORD]: new CustomFormControl(entity.password),
    };
    this.addControls(controls);
  }

  ngAfterViewInit(): void {
    this.formGroup.valueChanges
      .pipe(
        distinctUntilChanged(),
        untilDestroyed(this),
      )
      .subscribe(() => {
        const formObject = FormUtils.mapFormToObject(this.formGroup, User, this.entityStoreService.entity);
        this.entityStoreService.entity = new User(formObject);
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    FileUtils.convertFile(file).subscribe(base64 => {
      this.getControl(this.CONTROL_NAMES.AVATAR).setValue('data:image/png;base64,'+ base64);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([AppPathConstants.LOGIN]).then();
  }

  deleteProfile(): void {
    this.profileService.delete(this.entityStoreService.entity)
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        if (value.status?.guid === OperationStatusEnum.Ok) {
          this.logout();
        }
      });
  }

  changePassword(): void {
    this.profileService.changePassword({
      guid: this.entityStoreService.entity.guid,
      oldPassword: this.entityStoreService.entity.password,
      newPassword: this.entityStoreService.entity.newPassword,
    })
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        if (value.status?.guid === OperationStatusEnum.Ok) {
          this.logout();
        }
      });
  }

  protected beforeSaveActions(createNext: boolean = false) {
    UserStoreService.setUser(this.entityStoreService.entity);
    super.beforeSaveActions(createNext);
  }
}
