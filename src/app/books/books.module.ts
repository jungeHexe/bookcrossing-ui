import { NgModule } from '@angular/core';
import { BooksRoutingModule } from './books-routing.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { CoreModule } from "../core/core.module";
import { BookCardComponent } from './components/book-card/book-card.component';
import { BooksListFilterComponent } from './components/books-list-filter/books-list-filter.component';


@NgModule({
  declarations: [
    BooksListComponent,
    BookCardComponent,
    BooksListFilterComponent,
  ],
  imports: [
    CoreModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
