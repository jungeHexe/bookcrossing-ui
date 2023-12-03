import {EntityStoreService} from "../../core/stores/entity-store.service";
import {User} from "../../core/domain/user.model";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ProfileStoreService extends EntityStoreService<User> {}
