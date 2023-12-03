import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UserStoreService} from "./core/stores/user-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  notLanding(): boolean {
    return UserStoreService.isAuthorized() && location.pathname !== '/';
  }
}
