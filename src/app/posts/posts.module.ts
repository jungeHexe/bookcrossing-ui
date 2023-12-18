import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostsListFilterComponent } from './components/posts-list-filter/posts-list-filter.component';
import { PostsListCardComponent } from './components/posts-list-card/posts-list-card.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import {CoreModule} from "../core/core.module";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    PostsListComponent,
    PostsListFilterComponent,
    PostsListCardComponent,
    PostCardComponent
  ],
    imports: [
        CommonModule,
        PostsRoutingModule,
        CoreModule,
        NgxPaginationModule
    ]
})
export class PostsModule { }
