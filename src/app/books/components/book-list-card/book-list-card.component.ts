import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../domain/book.model";

@Component({
  selector: 'app-book-list-card',
  templateUrl: './book-list-card.component.html',
  styleUrls: ['./book-list-card.component.scss']
})
export class BookListCardComponent {

  @Input() book: Book = null;
  @Output() onClick = new EventEmitter<string>();

}
