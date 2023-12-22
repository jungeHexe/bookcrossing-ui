import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Request} from "../../domain/request.model";
import {DateUtils} from "../../../core/utils/date-utils";
import {Router} from "@angular/router";
import {AppPathConstants} from "../../../app.constants";

@Component({
  selector: 'app-requests-list-card',
  templateUrl: './requests-list-card.component.html',
  styleUrls: ['./requests-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsListCardComponent {

  @Input() request: Request = null;
  @Output() onClick = new EventEmitter<string>();
  @Output() onDblclick = new EventEmitter<string>();

  constructor(
    private readonly router: Router,
  ) {
  }

  protected readonly DateUtils = DateUtils;

  goToUser(guid: string) {
    this.router.navigate([
      AppPathConstants.PROFILE, guid
    ]).then();
  }
}
