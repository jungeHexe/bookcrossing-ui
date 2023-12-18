import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseEditorComponent} from "../../../core/components/base-editor.component";
import {Post, PostControlNames} from "../../domain/post.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../../core/services/navigation.service";
import {AppPathConstants} from "../../../app.constants";
import {CustomFormControl} from "../../../core/components/custom-form.control";
import {Validators} from "@angular/forms";
import {validators} from "../../../core/services/validation.service";
import {distinctUntilChanged} from "rxjs";
import {untilDestroyed} from "@ngneat/until-destroy";
import {FormUtils} from "../../../core/utils/form-utils";
import {FileUtils} from "../../../core/utils/file-utils";
import {PostsService} from "../../service/posts.service";
import {PostStoreService} from "../../store/post-store.service";
import {PostTypeEnum} from "../../../core/enums/post-type.enum";
import {UserStoreService} from "../../../core/stores/user-store.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent extends BaseEditorComponent<Post> implements OnInit, AfterViewInit {

  readonly CONTROL_NAMES = PostControlNames;

  constructor(
    router: Router,
    route: ActivatedRoute,
    navigationService: NavigationService,
    readonly postsService: PostsService,
    readonly postStoreService: PostStoreService,
    readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    super(router, route, navigationService, postsService, postStoreService);

    if (!this.entityStoreService.loadedEntity) {
      this.entityStoreService.loadedEntity = new Post(this.entityStoreService.entity ?? {
        localObject: true,
        user: UserStoreService.user,
      });
    }

    if (this.entityStoreService.loadedEntity && !this.entityStoreService.entity) {
      this.entityStoreService.entity = new Post(this.entityStoreService.loadedEntity);
    }

    this.listUrl = AppPathConstants.POSTS;
  }

  ngOnInit(): void {
    const entity = this.entityStoreService.entity;
    const controls = {
      [this.CONTROL_NAMES.TITLE]: new CustomFormControl(entity.title, [
        Validators.required,
      ]),
      [this.CONTROL_NAMES.CONTENT]: new CustomFormControl(entity.content),
      [this.CONTROL_NAMES.IMAGE]: new CustomFormControl(entity.image),
      [this.CONTROL_NAMES.TYPE]: new CustomFormControl(entity.type, [
        Validators.required,
      ]),
      [this.CONTROL_NAMES.BOOK]: new CustomFormControl(entity.book),
      [this.CONTROL_NAMES.BOOK_RATING]: new CustomFormControl(entity.bookRating, [
        validators.minValue(1),
        validators.maxValue(5),
      ]),
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
        const formObject = FormUtils.mapFormToObject(this.formGroup, Post, this.entityStoreService.entity);
        this.entityStoreService.entity = new Post(formObject);
      });

    this.bookRequiredHandler();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    FileUtils.convertFile(file).subscribe(base64 => {
      this.getControl(this.CONTROL_NAMES.IMAGE).setValue('data:image/png;base64,'+ base64);
      this.changeDetectorRef.detectChanges();
    });
  }

  clearCover(): void {
    this.getControl(this.CONTROL_NAMES.IMAGE).setValue(null);
  }

  isReview(): boolean {
    return this.entityStoreService.entity?.type?.guid === PostTypeEnum.Review;
  }

  bookRequiredHandler(): void {
    this.getControl(this.CONTROL_NAMES.TYPE).valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        const validator = value.guid === PostTypeEnum.Review ? [Validators.required] : [Validators.nullValidator];
        this.getControl(this.CONTROL_NAMES.BOOK).setValidators(validator);
        this.getControl(this.CONTROL_NAMES.BOOK_RATING).setValidators(validator);
      });
  }

  isCanEdit(): boolean {
    return this.entityStoreService.entity.user?.guid === UserStoreService.user?.guid;
  }
}
