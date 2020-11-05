import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import { LoginRoutingModule} from "./login-routing.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoginRoutingModule
  ],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
