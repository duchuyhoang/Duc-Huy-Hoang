import { Component, OnInit } from '@angular/core';
import {FormGroup, FormsModule,ReactiveFormsModule, Validators} from '@angular/forms';
import {FormControl,FormBuilder} from '@angular/forms';
import { SignUpServiceService } from '../../services/sign-up-service.service';
import {Router} from "@angular/router";
declare var $:any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
public signUpStatus="";
  public formRegister:FormGroup;
    public passwordError:boolean=false;
    public lastNameError:boolean=false;
    public firstNameError:boolean=false;
    public emailRequired=false;
    public emailError=false;
    public confirmPassword=false;
    public firstPassError=false;
    // private userList=[];
    
  constructor(private signUpUser:SignUpServiceService,private router:Router,private fb:FormBuilder) { 
  }


  ngOnInit(): void {
  //  this.signUpUser.signUp("abc@gmail.com","123");
    // this.verifyUser.getAll();
    // this.router.navigate(['login']);
   
  this.formRegister=this.fb.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
  email:['',[Validators.required,Validators.email]],
  password:['',Validators.required],
  confirmPassword:['',Validators.required],
  
  
  })
  
  
  

    }
  
  public async onSubmit(){
    let pass=true;
    
    if(this.formRegister.get("firstName").value===""){
     this.firstNameError=true;
  pass=false;
    }
    else{
     this.firstNameError=false;
  }
  
    if(this.formRegister.get("lastName").value===""){
     this.lastNameError=true;
      pass=false;
    }
    else{
     this.lastNameError=false;
    }
  
    
    if(this.formRegister.get("email").errors!=null){
      if(this.formRegister.get("email").errors.email!=null){
    
        this.emailError=true;
        this.emailRequired=false;
        pass=false;
      }
      else if(this.formRegister.get("email").errors.required!=null){
        this.emailError=false;
        this.emailRequired=true;
        pass=false;
        // alert("Điền email");
      }
    }
    else{
      this.emailError=false;
        this.emailRequired=false;  
    }
    
    if(this.formRegister.get("password").value===""){
      this.firstPassError=true;
      pass=false;
    }
    else{
      this.firstPassError=false;
  
    }
    if(this.formRegister.get("confirmPassword").value===""){
      this.confirmPassword=true;
    pass=false;
    
    }
  else{
    this.confirmPassword=false;
  }
  
  
    if(this.formRegister.get("password").value!=this.formRegister.get("confirmPassword").value){
      this.passwordError=true;
      if(this.formRegister.get("confirmPassword").value===""){
      this.confirmPassword=true;
  }
  else{
    this.confirmPassword=false;
  }
      pass=false;
    }
    else{
      // this.confirmPassword=false;
   
      this.passwordError=false;
    }
    
  if(pass==true){
  
    let rs=await this.signUpUser.signUp(this.formRegister.value.email,this.formRegister.value.password,
      this.formRegister.value.firstName+" "+this.formRegister.value.lastName );
      this.signUpStatus=rs;
$("#signUpStatus").modal();
  // if(this.userList.indexOf(this.formRegister.value.email)!=-1){
  // alert("ĐÃ CÓ EMAIL NÀY RỒI");
  }
   
  }
  
  // console.log(pass);
  public setStatus(status):string{
return status;

  }



  }
  
  
  

  


