import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { CustomFormControl } from 'src/app/core/components/custom-form.control';
import { NavigationService } from 'src/app/core/services/navigation.service';
import {BaseEditorComponent} from "../../../core/components/base-editor.component";
import { Book, BookControlNames } from '../../domain/book.model';
import { BooksService } from '../../service/books.service';
import {BookStoreService} from "../../store/book-store.service";
import {Validators} from "@angular/forms";
import { validators } from 'src/app/core/services/validation.service';
import { FormUtils } from 'src/app/core/utils/form-utils';
import {untilDestroyed} from "@ngneat/until-destroy";
import {distinctUntilChanged} from "rxjs";
import {FileUtils} from "../../../core/utils/file-utils";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent extends BaseEditorComponent<Book> implements OnInit {

  readonly CONTROL_NAMES = BookControlNames;

  constructor(
    router: Router,
    route: ActivatedRoute,
    navigationService: NavigationService,
    readonly bookService: BooksService,
    readonly bookStoreService: BookStoreService,
  ) {
    super(router, route, navigationService, bookService, bookStoreService);

    if (!this.entityStoreService.loadedEntity) {
      this.entityStoreService.loadedEntity = new Book(this.entityStoreService.entity ?? {
        localObject: true,
      });
    }

    if (this.entityStoreService.loadedEntity && !this.entityStoreService.entity) {
      this.entityStoreService.entity = new Book(this.entityStoreService.loadedEntity);
    }
  }

  ngOnInit(): void {
    const entity = this.entityStoreService.entity;
    const controls = {
      [this.CONTROL_NAMES.TITLE]: new CustomFormControl(entity.title, [
        Validators.required,
        validators.maxLength(2500),
      ]),
      [this.CONTROL_NAMES.AUTHORS]: new CustomFormControl(entity.authors, [
        Validators.required,
      ]),
      [this.CONTROL_NAMES.GENRES]: new CustomFormControl(entity.genres, [
        Validators.required,
      ]),
      [this.CONTROL_NAMES.DESCRIPTION]: new CustomFormControl(entity.description, [
        validators.maxLength(5000),
      ]),
      [this.CONTROL_NAMES.PIC_FILE_NAME]: new CustomFormControl(entity.picFileName)
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
        const formObject = FormUtils.mapFormToObject(this.formGroup, Book, this.entityStoreService.entity);
        this.entityStoreService.entity = new Book(formObject);
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    FileUtils.convertFile(file).subscribe(base64 => {
      this.getControl(this.CONTROL_NAMES.PIC_FILE_NAME).setValue('data:image/png;base64,'+ base64);
    });
  }

  clearCover(): void {
    this.getControl(this.CONTROL_NAMES.PIC_FILE_NAME).setValue(null);
  }
}
