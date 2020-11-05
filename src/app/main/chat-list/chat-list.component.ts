import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageInfoService} from '../../services/session-storage-info.service';
import { CloudFireStoreGetService} from '../../services/cloud-fire-store-get.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare var $: any;
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
public currentUser:any={};
public addUserList:string[]=[]
public currentUserAllConversationId:string[]=[];
public currentUserChatListInfo=[];
public addForm:FormGroup;
public addFormTitleError=false;
public addEmailError=false;
private shut:any;
  constructor(private route:Router,private loginInfo:SessionStorageInfoService,private currentUserChatList:CloudFireStoreGetService,private userAuth:AngularFireAuth,
   public fb:FormBuilder
    ) { }

  async ngOnInit(){

    this.addForm=this.fb.group({
      chatTitle:["",Validators.required],
      addEmail:["",Validators.email]
      
      })

    // Check if user login
    if(this.startCheckAccount()==false){
    return 

    }

// Form builder validators



this.getUserInfo();
this.addUserList.push(this.currentUser.email);

// this.currentUserChatList.addUser("123","huyhoang100320@gmail.com");

// Get all conversation by user email
// this.currentUserChatListInfo= await this.currentUserChatList.getByUserEmail(this.currentUser.email);

// console.log();

this.shut=this.currentUserChatList.chatListListenConversation(this.currentUser.email)
.subscribe((value)=>{
  console.log(value);
  
  for(let i=0;i<value.length;i++){
    
   this.currentUserAllConversationId[i]=value[i].payload.doc.id;
    this.currentUserChatListInfo[i]=value[i].payload.doc.data();
    // if(value[i].type=="modified"){
    //   console.log(value[i].payload.doc.data());
      
    // }
}

// console.log(this.currentUserChatListInfo);

}
)

// this.currentUserChatList.getConversationByID("n6uMuiPYAMsW400i48jR").subscribe((convers)=>{
//   // console.log(convers);
  
// })

  }

private startCheckAccount(){
  if(this.loginInfo.checkSessionStorage()==false) {
    console.log("sai");
    
  this.route.navigate(['/login']);
  return false;
  }
return true;
}

private getUserInfo(){
  let info=this.loginInfo.getSessionStorageInfo();
  this.currentUser.name=info['username'];
  this.currentUser.email=info['email'];

  // O4TtwLvgNBbkDcEbN0KB
// Get all conversations id

  this.currentUserChatList.getId(this.currentUser.email).subscribe((listConversationHeader)=>{
    for(let i=0;i<listConversationHeader.length;i++){
      // console.log(listConversationHeader[i].payload.doc.id);
      this.currentUserAllConversationId.push(listConversationHeader[i].payload.doc.id)}
})

}

public signOut(){
this.userAuth.signOut().then(()=>{
this.loginInfo.clearSessionStorage();
this.route.navigate(['/login']);
})
}


public addConversation(){
if(this.addForm.get("chatTitle").errors!=null){
  if(this.addForm.get("chatTitle").errors.required==true){
    this.addFormTitleError=true;
    return;
  }
  
  else if(this.addForm.get("chatTitle").value.trim()===""){
    this.addFormTitleError=true;
    return;
  }
}
else{
  this.addFormTitleError=false;
  this.addForm.get("addEmail").setValue("");
}

let newConversation={
dayCreated:new Date().toISOString(),
messages:[],
users:this.addUserList,
titles:this.addForm.get("chatTitle").value

}

this.currentUserChatList.addConversation(newConversation).then(value=>{
this.currentUserAllConversationId.push(value.id);
alert("Thêm conversation thành công");
this.addForm.get("chatTitle").setValue("");
this.addUserList=[this.currentUser.email];
}).catch(e=>{
  alert("Co loi khi them");
  
});


}

public showAddConversationForm(){
$("#addConversation").modal();
}



public addUserToList(){
let user= this.addForm.get("addEmail").value.trim();
if(user===""){
  alert("Nhập member đi");
}
else if(this.addForm.get("addEmail").errors!=null){
this.addEmailError=true;
this.addForm.get("addEmail").setValue("");
}

else{
  this.addEmailError=false;
  this.addForm.get("addEmail").setValue("");
  if(this.addUserList.indexOf(user)==-1){
    this.addUserList.push(user);
    $("#successfulAdd").modal();
  }
  else{
  alert("Đã có user này rồi");
  }
}

// console.log(this.addUserList);

// console.log(this.addFormTitleError);

}


public test(){
  this.currentUserChatList.test();
}

ngOnDestroy(){
  try{
    this.shut.unsubscribe();
  }
  catch(err){
   return;
    
  }
}




}
