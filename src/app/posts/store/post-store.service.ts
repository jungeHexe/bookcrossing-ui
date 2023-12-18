import {Injectable} from "@angular/core";
import {EntityStoreService} from "../../core/stores/entity-store.service";
import {Post} from "../domain/post.model";

@Injectable({ providedIn: 'root' })
export class PostStoreService extends EntityStoreService<Post> {}
