import { Injectable } from "@angular/core";
import {EntityStoreService} from "../../core/stores/entity-store.service";
import {Book} from "../domain/book.model";

@Injectable({ providedIn: 'root' })
export class BookStoreService extends EntityStoreService<Book> {}