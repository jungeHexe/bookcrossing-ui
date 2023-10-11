import { Component, Input, OnInit } from '@angular/core';
import {Book} from "../../domain/book.model";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  @Input() book: Book = null;
  
  showCard() {
    console.log('i clicked', this.book.guid);
  }

}
