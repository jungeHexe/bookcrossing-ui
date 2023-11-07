import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import {UserStoreService} from "../stores/user-store.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authenticationService: AuthentificationService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (UserStoreService.isAuthorized()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
