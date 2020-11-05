import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CloudFireStoreGetService } from '../../services/cloud-fire-store-get.service';
import { SessionStorageInfoService } from '../../services/session-storage-info.service';
import { ChatscreenService } from '../../services/chatscreen.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare var $: any;
@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  public currentChatScreenId: string;
  public currentUser: any = {};
  private chatMessageList: any;
  private firstTime = true;
  public messageSend: FormGroup
  constructor(private activeRoute: ActivatedRoute,
    private route: Router,
    private chatPageInfo: CloudFireStoreGetService,
    private chatScreen: ChatscreenService,
    private fileStorage: AngularFireStorage,
    private loginInfo: SessionStorageInfoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.messageSend = this.fb.group({
      message: ["", Validators.required]

    })

    // Check if no chat id exist  
    this.checkId();
    this.getUserInfo();






    // console.log(this.currentChatScreenId);
    this.chatPageInfo.getChatPageInfoById(this.currentChatScreenId).then(value => {
      this.chatMessageList = value.data();
      this.renderAllChatMessages();
    })

    this.chatScreen.getTheLatetestChatMessagesById(this.currentChatScreenId).subscribe((value) => {
      if (this.firstTime == false) {
        let ob: any = value.payload.data();

        let newMessage = ob.messages[ob.messages.length - 1];
        if(newMessage.type==="text"){
          this.renderOneChatMessage(newMessage.owner, newMessage.content, newMessage.createAt);
        }
        else if(newMessage.type==="image"){
          this.renderOneImgMessage(newMessage.owner, newMessage.content, newMessage.createAt);
        }



      }
      else {
        this.firstTime = false;
      }


    })


  }

  public uploadMessage() {
    console.log(this.messageSend.get("message").value.trim() == "");
    
    // console.log(this.messageSend.get("message").value);
    if (this.messageSend.get("message").errors) {
      if (this.messageSend.get("message").errors.required == true) {
        $("#noMessage").modal();
      }

    }
    else if (this.messageSend.get("message").value.trim() == "")
      $("#noMessage").modal();

    else {
      let message = {
        owner: this.currentUser.email,
        createAt: new Date().toISOString(),
        content: this.messageSend.get("message").value.trim()
      }
      console.log("ok");
      
      this.messageSend.get("message").setValue("");
      this.chatScreen.updateMessage(this.currentChatScreenId, message)
    }
  }

  private checkId() {
    this.currentChatScreenId = this.activeRoute.snapshot.paramMap.get('id') || "";
    if (this.currentChatScreenId === "") {
      this.route.navigate["/chat-list"];
      return;
    }

  }
  public test() {
    // this.chatScreen.test(this.currentChatScreenId);
    let doan = document.getElementById("left-side-bar") as HTMLDivElement;
    if (doan.style.width == "") {
      doan.style.width = "0";
    }
    console.log(doan.style.width);

    if (doan.style.width == "0px") {
      doan.style.width = 150 + "px";
      // doan.style.display="block";
    }
    else {
      doan.style.width = "0";
      // doan.style.display="none";

    }


  }

  public uploadImage($event) {
    let file = $event.target.files[0];
    this.chatScreen.uploadImage(file, this.currentChatScreenId, this.currentUser.email);
  }

  public renderAllChatMessages() {
    let owner = this.currentUser.email;
    for (let i = 0; i < this.chatMessageList.messages.length; i++) {
      if(this.chatMessageList.messages[i].type=="text"){
        this.renderOneChatMessage(this.chatMessageList.messages[i].owner, this.chatMessageList.messages[i].content, this.chatMessageList.messages[i].createAt);
      }
      else if(this.chatMessageList.messages[i].type=="image"){
this.renderOneImgMessage(this.chatMessageList.messages[i].owner, this.chatMessageList.messages[i].content,this.chatMessageList.messages[i].createAt)


      }
    }


  }

  public renderOneChatMessage(owner, content, timeISOString) {
    let one = document.createElement("div");
    let text, time, user;
    one.classList.add("message-wrapper");
    // console.log(this.curr);

    if (owner == this.currentUser.email) {
      this.renderOwnerChatMessageTime(timeISOString);
      one.classList.add("flex-row-reverse");
      text = document.createElement("div");
      text.classList.add("your-message");
      text.appendChild(document.createTextNode(content));

    }
    else {
      // this.renderTheirChatMessageTime(timeISOString);
      this.renderTheirEmail(owner);
      text = document.createElement("div");
      text.classList.add("their-message");
      text.appendChild(this.renderTheirChatMessageTime(timeISOString));
      text.appendChild(document.createTextNode(content));

    }
    one.appendChild(text);
    document.getElementById("chat").appendChild(one);
  }

  public renderOneImgMessage(owner, link, timeISOString) {
    let one = document.createElement("div");
    let rs, whoImage, imgWrapper, mainImg, otherUserTime;
    if (this.currentUser.email === owner) {
      this.renderOwnerChatMessageTime(timeISOString);
      one.classList.add("imageContainer");

      whoImage = document.createElement("div")
whoImage.classList.add("yourImage");

      imgWrapper = document.createElement("div");
      imgWrapper.classList.add("img-wrapper");

      mainImg = document.createElement("img");
      mainImg.src = link;
    
      imgWrapper.appendChild(mainImg);
      whoImage.appendChild(imgWrapper);
      one.appendChild(whoImage);

    }

    else {
      this.renderTheirEmail(owner);
      one.classList.add("imageContainer");

      whoImage = document.createElement("div")
      whoImage.classList.add("theirImage");

      imgWrapper = document.createElement("div")
      imgWrapper.classList.add("img-wrapper");

      mainImg = document.createElement("img");
      mainImg.src = link;

      imgWrapper.appendChild(mainImg);
      imgWrapper.appendChild(this.renderTheirChatMessageTime(timeISOString));

      whoImage.appendChild(imgWrapper);
      one.appendChild(whoImage);

    }
document.getElementById("chat").appendChild(one);











  }

  private getUserInfo() {
    let info = this.loginInfo.getSessionStorageInfo();
    this.currentUser.name = info['username'];
    this.currentUser.email = info['email'];
  }

  public renderTheirChatMessageTime(timeISOString) {
    let time = new Date(timeISOString);
    let trave = "";
    trave += time.getHours() + ":" + time.getMinutes() + ", " + time.getDate() + " Tháng " + (time.getMonth() + 1) + ", " + time.getFullYear();
    let timeContainer = document.createElement("div");
    timeContainer.classList.add("message-time");
    timeContainer.appendChild(document.createTextNode(trave));
    return timeContainer;
  }

  public renderOwnerChatMessageTime(timeISOString) {
    let time = new Date(timeISOString);
    let trave = "";
    trave += time.getHours() + ":" + time.getMinutes() + ", " + time.getDate() + " Tháng " + (time.getMonth() + 1) + ", " + time.getFullYear();
    let ownerContainer = document.createElement("div");
    ownerContainer.classList.add("your-time-container");
    let ownerTime = document.createElement("div");
    ownerTime.classList.add("time-owner");
    ownerTime.appendChild(document.createTextNode(trave));
    ownerContainer.appendChild(ownerTime);
    document.getElementById("chat").appendChild(ownerContainer);
  }

  public renderTheirEmail(owner) {
    let theirEmail = document.createElement("div");
    theirEmail.classList.add("message-owner");
    theirEmail.appendChild(document.createTextNode(owner));
    document.getElementById("chat").appendChild(theirEmail);
  }




}
