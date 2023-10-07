import { Component } from '@angular/core';
import {UserStoreService} from "./core/stores/user-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isAuthorized = UserStoreService.isAuthorized();
}
