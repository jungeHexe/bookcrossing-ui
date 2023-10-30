import { BooksService } from "../service/books.service";
import {NavigationService} from "../../core/services/navigation.service";
import { BookStoreService } from "../store/book-store.service";
import { Injectable } from "@angular/core";
import { Book } from "../domain/book.model";
import { EntityEditorResolver } from "src/app/core/resolvers/entity-editor-resolver.service";

@Injectable({ providedIn: 'root' })
export class BookEditorResolver extends EntityEditorResolver<Book> {
  constructor(
    navigationService: NavigationService,
    entitiesService: BooksService,
    entityStoreService: BookStoreService,
    ) {
    super(navigationService, entitiesService, entityStoreService);
  }
}
