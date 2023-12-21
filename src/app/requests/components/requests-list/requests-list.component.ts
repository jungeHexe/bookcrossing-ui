import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RequestsService} from "../../services/requests.service";
import {AbstractList} from "../../../core/domain/abstract-list";
import {Request} from "../../domain/request.model";
import {RequestsListRepository} from "../../domain/requests-list-repository";

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsListComponent extends AbstractList<Request> {

  constructor(
    router: Router,
    route: ActivatedRoute,
    // private readonly listFilterStoreService: any,
    private readonly entityService: RequestsService,
  ) {
    super(router, route);
    this.repository = new RequestsListRepository(
      this.entityService,
      null,
    );

  }
}
