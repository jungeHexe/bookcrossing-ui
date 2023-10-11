import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppPathConstants} from "../../../app.constants";

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
    this.router.navigate([AppPathConstants.LANDING]).then();
  }

}
