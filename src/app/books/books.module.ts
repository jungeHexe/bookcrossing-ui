import { NgModule } from '@angular/core';
import { BooksRoutingModule } from './books-routing.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { CoreModule } from "../core/core.module";
import { BooksListFilterComponent } from './components/books-list-filter/books-list-filter.component';
import { BookListCardComponent } from './components/book-list-card/book-list-card.component';
import { BookCardComponent } from './components/book-card/book-card.component';


@NgModule({
  declarations: [
    BooksListComponent,
    BookListCardComponent,
    BooksListFilterComponent,
    BookCardComponent,
  ],
  imports: [
    CoreModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
