import {Injectable} from "@angular/core";
import {EntityEditorResolver} from "../../core/resolvers/entity-editor-resolver.service";
import {NavigationService} from "../../core/services/navigation.service";
import {Post} from "../domain/post.model";
import {PostsService} from "../service/posts.service";
import {PostStoreService} from "../store/post-store.service";

@Injectable({ providedIn: 'root' })
export class PostEditorResolver extends EntityEditorResolver<Post> {
  constructor(
    navigationService: NavigationService,
    entitiesService: PostsService,
    entityStoreService: PostStoreService,
  ) {
    super(navigationService, entitiesService, entityStoreService);
  }
}
