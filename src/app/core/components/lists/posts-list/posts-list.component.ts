import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BaseListRepository} from "../../../repositories/base-list-repository";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonDataService} from "../../../services/commom-data.service";
import {PostsInternalListRepository} from "../../../repositories/posts-internal-list-repository";
import {AbstractList} from "../../../domain/abstract-list";
import {Post} from "../../../../posts/domain/post.model";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent extends AbstractList<Post> implements OnInit {

  @Input() bookId: string;
  @Input() userId: string;

  repository: BaseListRepository;

  constructor(
    router: Router,
    route: ActivatedRoute,
    private readonly commonDataService: CommonDataService,
  ) {
    super(router, route);
  }

  ngOnInit(): void {
    this.repository = new PostsInternalListRepository(
      this.commonDataService,
      this.userId,
      this.bookId,
    );
  }

  getPage(page: number): void {
    this.loading = true;
    this.repository.paginationData.page = page;
    this.data$ = this.repository.getData();
  }

}
