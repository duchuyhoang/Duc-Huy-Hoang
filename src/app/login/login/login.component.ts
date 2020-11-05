import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {LoginServiceService} from "../../services/login-service.service";
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;
  // file:File;
  public loginError = "";
  public passwordError = "";
  constructor(private auth: AngularFireAuth,
    public form: FormBuilder,
private verifyUser:LoginServiceService
     ) { }

  ngOnInit(): void {

    this.logInForm = this.form.group({
      loginEmail: ["", [Validators.required, Validators.email]],
      loginPassword: ["", Validators.required]
    })



    this.auth.onAuthStateChanged(function (user) {
      if (user) {


      } else {
        // No user is signed in.
      }
    });

  }

  onSubmit(): void {
    console.log(this.logInForm.get("loginEmail"));
    
    if(this.checkEmailError("loginEmail")==true&&this.checkPasswordError("loginPassword")){
      console.log(this.logInForm.value);
      
this.verifyUser.login(this.logInForm.value.loginEmail,this.logInForm.value.loginPassword);



    }
    // this.checkEmailError("loginEmail");
    ;
  }
  private checkEmailError(target: any): boolean {
    if(this.logInForm.get(target).errors==null){
      this.loginError = "";

      return true;
    }
    if (this.logInForm.get(target).errors.required == true) {
      $("#emailError").modal();
      this.loginError = "Nhập email đi bạn êi";
      return false;
    }
    else if (this.logInForm.get(target).errors.email == true) {
      $("#emailError").modal();
      this.loginError = "Sai định dạng email";
      return false;
    }
    // else {
    //   return true;
    // }



  }
  private checkPasswordError(target: any): boolean {
    if(this.logInForm.get(target).errors==null){
      this.passwordError = "";
return true;
    }
    if (this.logInForm.get(target).errors.required == true) {
      $("#passwordError").modal();
      this.passwordError = "Nhập password đi bạn êi";
      return false;
    }
    
  }


}
