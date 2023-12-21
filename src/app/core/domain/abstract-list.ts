import { Observable } from "rxjs";
import {BaseListRepository} from "../repositories/base-list-repository";
import { BaseDomain } from "./base-domain.model";
import {Component, Inject, OnInit} from "@angular/core";
import { EntityStoreService } from "../stores/entity-store.service";
import { AppPathConstants } from "src/app/app.constants";
import {ActivatedRoute, Router } from "@angular/router";

@Component({
  template: ''
})
export abstract class AbstractList<T extends BaseDomain> implements OnInit {

  repository: BaseListRepository;
  data$: Observable<T[]>;
  loading = false;

  constructor(
    readonly router: Router,
    readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getPage(1);
  }

  onCreateClick(): void {
    this.router.navigate(
      [AppPathConstants.CREATE],
      { relativeTo: this.route },
      ).then();
  }

  onReadClick(id: string): void {
    this.router.navigate([
      AppPathConstants.READ,
      id,
      ], { relativeTo: this.route }).then();
  }

  getPage(page: number): void {
    this.loading = true;
    this.repository.paginationData.page = page;
    this.data$ = this.repository.getData();
  }
}
