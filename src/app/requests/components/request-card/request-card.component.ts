import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BaseEditorComponent} from "../../../core/components/base-editor.component";
import {Request, RequestControlNames} from "../../domain/request.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../../core/services/navigation.service";
import {UserStoreService} from "../../../core/stores/user-store.service";
import {AppPathConstants} from "../../../app.constants";
import {CustomFormControl} from "../../../core/components/custom-form.control";
import {Validators} from "@angular/forms";
import {distinctUntilChanged} from "rxjs";
import {untilDestroyed} from "@ngneat/until-destroy";
import {FormUtils} from "../../../core/utils/form-utils";
import {RequestStoreService} from "../../stores/request-store.service";
import {RequestsService} from "../../services/requests.service";
import {RequestStatusEnum} from "../../domain/enum/request-status.enum";

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestCardComponent extends BaseEditorComponent<Request> implements OnInit, AfterViewInit {

  readonly CONTROL_NAMES = RequestControlNames;

  constructor(
    router: Router,
    route: ActivatedRoute,
    navigationService: NavigationService,
    readonly requestsService: RequestsService,
    readonly requestStoreService: RequestStoreService,
  ) {
    super(router, route, navigationService, requestsService, requestStoreService);

    if (!this.entityStoreService.loadedEntity) {
      this.entityStoreService.loadedEntity = new Request(this.entityStoreService.entity ?? {
        localObject: true,
        user: UserStoreService.user,
      });
    }

    if (this.entityStoreService.loadedEntity && !this.entityStoreService.entity) {
      this.entityStoreService.entity = new Request(this.entityStoreService.loadedEntity);
    }

    this.listUrl = AppPathConstants.REQUESTS;
  }

  ngOnInit(): void {
    const entity = this.entityStoreService.entity;
    const controls = {
      [this.CONTROL_NAMES.BOOK]: new CustomFormControl(entity.book, [
        Validators.required,
      ]),
      [this.CONTROL_NAMES.POINT]: new CustomFormControl(entity.point, [
        Validators.required,
      ]),
    };
    this.addControls(controls);
  }

  ngAfterViewInit(): void {
    if (this.isReadOnlyMode$.value) {
      this.formGroup.disable();
      return;
    }
    this.formGroup.valueChanges
      .pipe(
        distinctUntilChanged(),
        untilDestroyed(this),
      )
      .subscribe(() => {
        const formObject = FormUtils.mapFormToObject(this.formGroup, Request, this.entityStoreService.entity);
        this.entityStoreService.entity = new Request(formObject);
      });
  }

  setArchiveStatus(): void {
    this.entityStoreService.entity.status = RequestStatusEnum.Completed;
    this._save();
  }

  isCanEdit(): boolean {
    return this.entityStoreService.entity.user?.guid === UserStoreService.user?.guid;
  }
}
