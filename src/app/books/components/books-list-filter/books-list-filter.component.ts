import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import { CustomFormControl } from 'src/app/core/components/custom-form.control';
import { BaseListRepository } from 'src/app/core/repositories/base-list-repository';
import {BaseListFilterComponent} from "../../../core/components/base-list-filter.component";
import { BooksListFilter, BooksListFilterControlNames } from '../../domain/books-list-filter.model';
import {BooksListFilterStoreService} from "../../store/books-list-filter-store.service";

@UntilDestroy()
@Component({
  selector: 'app-books-list-filter',
  templateUrl: './books-list-filter.component.html',
  styleUrls: ['./books-list-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListFilterComponent extends BaseListFilterComponent implements OnInit, AfterViewInit {

  @Input() repository: BaseListRepository;
  @Output() onSearchClick = new EventEmitter();

  readonly controlNames = BooksListFilterControlNames;
  readonly formGroup: FormGroup = new FormGroup({});

  constructor(
    private readonly listFilterStoreService: BooksListFilterStoreService,
  ) {
    super();
  }

  ngOnInit(): void {
    const filter = this.listFilterStoreService.filter;
    const controls = {
      [this.controlNames.AUTHOR_NAME]: new CustomFormControl(filter.authorName),
      [this.controlNames.BOOK_TITLE]: new CustomFormControl(filter.bookTitle),
      [this.controlNames.GENRES]: new CustomFormControl(filter.genres),
      [this.controlNames.ORDER_BY]: new CustomFormControl(filter.orderBy?.name),
    };
    this.addControls(controls);
  }

  ngAfterViewInit(): void {
    // Сохранение изменения фильтра списка
    this.formGroup.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const formObject = this.mapFormToFilter(BooksListFilter);
        this.listFilterStoreService.filter = new BooksListFilter(formObject);
      });
  }

}
