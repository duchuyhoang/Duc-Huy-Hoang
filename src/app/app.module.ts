import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Firebase import
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import{AngularFireStorage} from'@angular/fire/storage';
import { AngularFireStorageModule } from'@angular/fire/storage';
// 


// All routing module here
import{LoginRoutingModule} from './login/login-routing.module';
import {SignUpRoutingModule} from './signup/signup-routing-module';
import { AppRoutingModule } from './app-routing.module';
import {MainRoutingModule} from './main/main.routing.module';
// 

// All app module here
import {SignupModule} from './signup/signup.module';
import {LoginModule} from './login/login.module';
import {MainModule} from './main/main.module';
// 
// import { SignupComponent } from './signup/signup/signup.component';

import { SignupComponent } from './signup/signup/signup.component';
//import Service
// import {SignUpServiceService} from './services/sign-up-service.service';



@NgModule({
  declarations: [
    AppComponent,
    // SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    NgbModule,
    SignUpRoutingModule,
    MainRoutingModule,
    SignupModule,
    LoginModule,
    MainModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
    // SignUpServiceService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
