import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionStorageInfoService } from "./session-storage-info.service"
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private authentication: AngularFireAuth, private router: Router, private firestore: AngularFirestore, private sessionStorage: SessionStorageInfoService) { }

  async login(email: string, password: string): Promise<any> {
    try {
      var response = await this.authentication.signInWithEmailAndPassword(email, password);
      // console.log(response);

      if (response && response.user.emailVerified) {

        let oneUser = {
          username: response.user.displayName,
          email: response.user.email
        };

        this.sessionStorage.setSessionStorage(oneUser);
        this.router.navigate(['/chat-list']);
      }
      else if (response && response.user.emailVerified == false) {
        alert("Vào email verify đi");
      }

    }
    catch (e) {
      alert("Sai email hoặc pass rồi")

    }


  }


}
