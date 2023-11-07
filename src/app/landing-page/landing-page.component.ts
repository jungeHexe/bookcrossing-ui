import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppPathConstants } from '../app.constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(
    readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  toLoginForm(): void {
    this.router.navigate([AppPathConstants.LOGIN]).then();
  }
}
