import {Injectable} from "@angular/core";
import {EntityStoreService} from "../../core/stores/entity-store.service";
import {Request} from "../domain/request.model";

@Injectable({ providedIn: 'root' })
export class RequestStoreService extends EntityStoreService<Request> {}
