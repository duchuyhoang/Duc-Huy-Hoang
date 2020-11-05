import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import {SignUpRoutingModule} from './signup-routing-module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap:[SignupComponent]
})
export class SignupModule {
 
  
 }
