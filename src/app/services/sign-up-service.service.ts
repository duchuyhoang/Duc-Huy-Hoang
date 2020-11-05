import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";
import {Router} from "@angular/router";
import {AngularFirestore} from '@angular/fire/firestore';
// import {of} from 'rxjs';
// import{Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignUpServiceService {

  constructor(private userAuth:AngularFireAuth,private router:Router,private firestore:AngularFirestore) {


   }

  
async signUp(email:string,password:string,userName:string):Promise<any>{
  // console.log("alooasa");
  
  try{
    let response= await this.userAuth.createUserWithEmailAndPassword(email,password);
   
    if(response){
        let person= await  this.userAuth.currentUser;
        person.updateProfile({
displayName:userName
        });
      // (await this.userAuth.currentUser).updateProfile({
      //   displayName:userName
      // })
      (await this.userAuth.currentUser).sendEmailVerification().then(()=>{
        console.log("email sent");
        
      });

    }
    return "Check email nhé!!!";
  }
catch(e){
  if(e.message=="The email address is already in use by another account."){
    // setStatus(e.message);
    return "Email này đã có rồi";
  }
  else if(e.message=="Password should be at least 6 characters"){
return "Password is weak at least 6 characters";

  }
 else{
   console.log(e);
   
 }
  
  // The email address is already in use by another account
  // console.log(e);
}



}



}
