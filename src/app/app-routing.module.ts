import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './signup/signup/signup.component';
import {ChatListComponent} from './main/chat-list/chat-list.component';
const routes: Routes = [
  {path:'',redirectTo:'/chat-list',pathMatch: 'full'},
  {path:'chat-list',component: ChatListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
