import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppPathConstants} from "../../../app.constants";
import {AuthentificationService} from "../../services/authentification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  
  constructor(
    readonly router: Router,
    private readonly authService: AuthentificationService,
  ) { }

  ngOnInit(): void {
  }

  goToLanding(): void {
    this.router.navigate([AppPathConstants.EMPTY]).then();
  }

  logout(): void {
    this.authService.logout();
    this.goToLanding();
  }
}
