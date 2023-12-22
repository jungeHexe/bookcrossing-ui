import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../domain/post.model";
import {DateUtils} from "../../../core/utils/date-utils";
import {AppPathConstants} from "../../../app.constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts-list-card',
  templateUrl: './posts-list-card.component.html',
  styleUrls: ['./posts-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListCardComponent {

  @Input() post: Post = null;
  @Output() onClick = new EventEmitter<string>();
  @Output() onDblclick = new EventEmitter<string>();

  constructor(
    private readonly router: Router,
  ) {
  }

  goToUser(guid: string) {
    this.router.navigate([
      AppPathConstants.PROFILE, guid
    ]).then();
  }
}
