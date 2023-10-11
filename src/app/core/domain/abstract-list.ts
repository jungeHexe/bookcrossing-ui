import { Observable } from "rxjs";
import {BaseListRepository} from "../repositories/base-list-repository";
import { BaseDomain } from "./base-domain.model";
import {Component, OnInit} from "@angular/core";

@Component({
  template: ''
})
export abstract class AbstractList<T extends BaseDomain> implements OnInit {
  
  repository: BaseListRepository;
  data$: Observable<T[]>;
  loading = false;
  
  ngOnInit(): void {
    this.getPage(1);
  }
  
  abstract getPage(page: number): void;
}