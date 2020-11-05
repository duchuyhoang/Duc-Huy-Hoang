import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatScreenComponent} from './chat-screen/chat-screen.component';
import {LoginComponent} from '../login/login/login.component';
const routes: Routes = [
  {path:'chat-screen/:id',component: ChatScreenComponent},
  {path:'login',component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
