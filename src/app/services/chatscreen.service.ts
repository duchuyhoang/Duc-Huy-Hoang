import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SessionStorageInfoService} from "./session-storage-info.service"
import{AngularFireStorage} from'@angular/fire/storage';
import { firestore } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class ChatscreenService {

  constructor(private cloudFireStorage:AngularFirestore,
    private fileStorage:AngularFireStorage
    ) { }

public getTheLatetestChatMessagesById(id){

return this.cloudFireStorage.collection("conversations").doc(id).snapshotChanges();

}

public test(id){
  let messages={
    content:"allk",
    day:56
  }
  let a={
    messages:firestore.FieldValue.arrayUnion(messages)
  }
  this.cloudFireStorage.collection("conversations").doc(id).update(a)
}
public updateImageMessage(id,imageInfo){
  let messages={
    type:"image",
    createAt:imageInfo.createAt,
    owner:imageInfo.owner,
    content:imageInfo.link,

  } 
  let a={
    messages:firestore.FieldValue.arrayUnion(messages)
  }
  this.cloudFireStorage.collection("conversations").doc(id).update(a)

}

public async uploadImage(file,conversationId,owner):Promise<any>{
  let path:string="";
if(file){
  try{
    // path+="/"+conversationId+file.name;
    path+=conversationId+"/"+file.name;
    const response= await this.fileStorage.upload(path,file);
    // console.log(response);
    
    let newImageLink= await this.getUrl(response);
    let newImageInfo={
      owner:owner,
      link:newImageLink,
      createAt:new Date().toISOString(),
    }
    this.updateImageMessage(conversationId,newImageInfo);
  }
catch(e){
  console.log(e);
  
}
}
}
public async getUrl(snap):Promise<any>{
let url= await snap.ref.getDownloadURL();
console.log(url);
return url;
}

public updateMessage(id,messageInfo){
  let messages={
    type:"text",
    createAt:messageInfo.createAt,
    owner:messageInfo.owner,
    content:messageInfo.content,
  } 
  let a={
    messages:firestore.FieldValue.arrayUnion(messages)
  }
  this.cloudFireStorage.collection("conversations").doc(id).update(a)


}

}
