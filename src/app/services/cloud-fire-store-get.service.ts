import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SessionStorageInfoService} from "./session-storage-info.service"
import { firestore } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class CloudFireStoreGetService {

  constructor(private userService: SessionStorageInfoService,private cloudFireStore:AngularFirestore) { }

public async getByUserEmail(email){
  try{
    let trave=[];

    let kq=  await this.cloudFireStore.collection("conversations",ref=>ref.where("users","array-contains",email)).get()
    .toPromise()
    .then(value=>{
      console.log(value.docs);
    for(let i=0;i<value.docs.length;i++){
        trave.push(value.docs[i].data());
      }
      
    })
   console.log(trave);

    
return trave;
  }
  catch(e){
    console.log(e);
    
  }
}

public getId(email){
  try{
    let kq=  this.cloudFireStore.collection("conversations",ref=>ref.where("users","array-contains",email)).snapshotChanges();
return kq;
    
  }
  catch(e){
    
  }
  // setTimeout(()=>{
  //   console.log(kq);
  // },1000);  

}

public getConversationByID(id){
let kq=this.cloudFireStore.collection("conversations").doc(id).valueChanges();
return kq;

}

public addConversation(conversation){
  let kq=this.cloudFireStore.collection("conversations").add(conversation);
  return kq;
}
public addUser(conversationId,email){
  // n6uMuiPYAMsW400i48jR
  // var ob= this.cloudFireStore.collection("conversations").doc("n6uMuiPYAMsW400i48jR").valueChanges();
  // ob.subscribe((value:any)=>{
  //   var dsUser=[];
  //   console.log(email);
    
  //   var canAdd=true;
  //   for(let i=0;i<value.users.length;i++){
  //     if(value.users[i]==email){
  //       alert("Đã có người này rồi");
  //       canAdd=false;
  //       break;
        
  //     }
  //     dsUser.push(value.users[i]);
  //   }
  //     if(canAdd=true){
  //       dsUser.push(email);
  //       let newUser={
  //         users:dsUser
  //       }
  //       this.cloudFireStore.collection("conversations").doc("n6uMuiPYAMsW400i48jR").update(newUser);
       
  //     }
    
  // });
  

  let newUser={
    users:firestore.FieldValue.arrayUnion(email)
  }
  
  this.cloudFireStore.collection("conversations").doc("n6uMuiPYAMsW400i48jR").update(newUser).then(ok=>{
    console.log("ok");
    
  });

//   this.cloudFireStore.collection("conversations").doc("n6uMuiPYAMsW400i48jR").get().toPromise().then(value=>{
//     var dsUser=[];
//       // console.log(email);
//       // console.log(value.data());
      
//       // var canAdd=true;
//       // for(let i=0;i<value.data().users.length;i++){
//       //   if(value.data().users[i]==email){
//       //     alert("Đã có người này rồi");
//       //     canAdd=false;
//       //     break;
          
//       //   }
//       //   dsUser.push(value.data().users[i]);
//       // }
//         // if(canAdd=true){
//           // dsUser.push(email);
          
//   // }
// }
//   )

  


}
 public chatListListenConversation(email){
  let a= this.cloudFireStore.collection("conversations",ref=>ref.where("users","array-contains",email)).snapshotChanges()
//   .subscribe(value=>{
// // console.log(value);
// for(let i=0;i<value.length;i++){
//   console.log(value[i].payload.doc.data());
//   change.push(value[i].payload.doc.data());
// }

//   });

 
  return a
}

public getChatPageInfoById(id){
  return this.cloudFireStore.collection('conversations').doc(id).get()
  .toPromise();
}

public test(){
  // 0phudzRXvD1dfcAPatKd
  let newa={
    messages:firestore.FieldValue.arrayUnion({
      day:10,
  content:"add suss"
    })
}
  
  this.cloudFireStore.collection('conversations').doc("0phudzRXvD1dfcAPatKd").update(newa);
}
}
