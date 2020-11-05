import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import {  RouterModule } from '@angular/router';
@NgModule({
  declarations: [ChatListComponent, ChatScreenComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class MainModule { }
