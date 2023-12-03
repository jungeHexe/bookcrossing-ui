import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppPathConstants} from "../../../app.constants";
import {UserStoreService} from "../../stores/user-store.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  constructor(
    readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToLanding(): void {
    this.router.navigate([AppPathConstants.EMPTY]).then();
  }

  getUserAvatar(): string {
    return UserStoreService.user?.avatar;
  }

  protected readonly UserStoreService = UserStoreService;
}
