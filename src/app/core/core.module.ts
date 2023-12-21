import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TextInputComponent} from "./components/inputs/text-input/text-input.component";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from "./components/inputs/button/button.component";
import { NgxPaginationModule } from "ngx-pagination";
import { SelectInputComponent } from './components/inputs/select-input/select-input.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { LoginComponent } from './components/login/login.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { PostsListComponent } from './components/lists/posts-list/posts-list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

const components = [
  TextInputComponent,
  ButtonComponent,
  FooterComponent,
  HeaderComponent,
  SelectInputComponent,

  TabsComponent,
  TabComponent,
];

const directives = [];

const pipes = [];

@NgModule({
  declarations: [
    ...components,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PostsListComponent,
    SpinnerComponent,
    // ...directives,
    //...pipes,
    ],
    exports: [
        // Angular modules
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        NgSelectModule,
        ReactiveFormsModule,
        RouterModule,

        ...components,
        PostsListComponent,
        SpinnerComponent,
//    ...directives,
//    ...pipes,
    ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class CoreModule {
}
