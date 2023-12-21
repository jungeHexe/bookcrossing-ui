import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractList} from "../../../core/domain/abstract-list";
import {Post} from "../../domain/post.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksListFilterStoreService} from "../../../books/store/books-list-filter-store.service";
import {BooksService} from "../../../books/service/books.service";
import {BooksListRepository} from "../../../books/domain/books-list-repository";
import {PostsListFilterStoreService} from "../../store/posts-list-filter-store.service";
import {PostsService} from "../../service/posts.service";
import {PostsListRepository} from "../../domain/posts-list-repository";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent extends AbstractList<Post>{

  constructor(
    router: Router,
    route: ActivatedRoute,
    private readonly listFilterStoreService: PostsListFilterStoreService,
    private readonly entityService: PostsService,
  ) {
    super(router, route);
    this.repository = new PostsListRepository(
      this.entityService,
      this.listFilterStoreService,
    );

  }

}
