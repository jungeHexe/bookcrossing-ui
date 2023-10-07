import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TextInputComponent} from "./components/inputs/text-input/text-input.component";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {ButtonComponent} from "./components/inputs/button/button.component";

const components = [
  TextInputComponent,
  ButtonComponent,
  FooterComponent,
  HeaderComponent,
];

//const directives = [];

//const pipes = [];

@NgModule({
  declarations: [
    ...components,
    HeaderComponent,
    FooterComponent,
//    ...directives,
//    ...pipes,
    ],
  exports: [
    // Angular modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    ...components,
//    ...directives,
//    ...pipes,
    ],
  imports: [
    CommonModule,
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