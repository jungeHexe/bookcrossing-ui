import {Injectable} from "@angular/core";
import {NavigationService} from "../../core/services/navigation.service";
import {User} from "../../core/domain/user.model";
import {ProfileStoreService} from "../store/profile-store.service";
import {EntityEditorResolver} from "../../core/resolvers/entity-editor-resolver.service";
import {ProfileService} from "../service/profile.service";

@Injectable({providedIn: 'root'})
export class ProfileResolver extends EntityEditorResolver<User> {
  constructor(
    navigationService: NavigationService,
    entitiesService: ProfileService,
    entityStoreService: ProfileStoreService,
  ) {
    super(navigationService, entitiesService, entityStoreService);
  }
}
