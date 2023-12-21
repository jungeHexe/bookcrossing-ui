import {Injectable} from "@angular/core";
import {EntityEditorResolver} from "../../core/resolvers/entity-editor-resolver.service";
import {NavigationService} from "../../core/services/navigation.service";
import {Request} from "../domain/request.model";
import {RequestsService} from "../services/requests.service";
import {RequestStoreService} from "../stores/request-store.service";

@Injectable({ providedIn: 'root' })
export class RequestEditorResolver extends EntityEditorResolver<Request> {
  constructor(
    navigationService: NavigationService,
    entitiesService: RequestsService,
    entityStoreService: RequestStoreService,
  ) {
    super(navigationService, entitiesService, entityStoreService);
  }
}
