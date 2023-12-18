import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseListFilterComponent} from "../../../core/components/base-list-filter.component";
import {BaseListRepository} from "../../../core/repositories/base-list-repository";
import {FormGroup} from "@angular/forms";
import {CustomFormControl} from "../../../core/components/custom-form.control";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {PostsListFilterStoreService} from "../../store/posts-list-filter-store.service";
import {PostsListFilter, PostsListFilterControlNames} from "../../domain/posts-list-filter.model";

@UntilDestroy()
@Component({
  selector: 'app-posts-list-filter',
  templateUrl: './posts-list-filter.component.html',
  styleUrls: ['./posts-list-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListFilterComponent extends BaseListFilterComponent implements OnInit, AfterViewInit {

  @Input() repository: BaseListRepository;
  @Output() onSearchClick = new EventEmitter();

  readonly controlNames = PostsListFilterControlNames;
  readonly formGroup: FormGroup = new FormGroup({});

  constructor(
    private readonly listFilterStoreService: PostsListFilterStoreService,
  ) {
    super();
  }

  ngOnInit(): void {
    const filter = this.listFilterStoreService.filter;
    const controls = {
      [this.controlNames.TYPE]: new CustomFormControl(filter.type),
      [this.controlNames.BOOK]: new CustomFormControl(filter.book),
    };
    this.addControls(controls);
  }

  ngAfterViewInit(): void {
    // Сохранение изменения фильтра списка
    this.formGroup.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const formObject = this.mapFormToFilter(PostsListFilter);
        this.listFilterStoreService.filter = new PostsListFilter(formObject);
      });
  }

}
