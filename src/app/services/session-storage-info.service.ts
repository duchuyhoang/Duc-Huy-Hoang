import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageInfoService {

  constructor() { }

public checkSessionStorage():boolean {
let sessionInfo=sessionStorage.getItem("user");
if(sessionInfo==null){
  return false;
}
return true;

}

public getSessionStorageInfo():any{
  let string="";
if(this.checkSessionStorage()==true) {
string=sessionStorage.getItem("user");
return JSON.parse(string);
}
else
return "";

}

public setSessionStorage(user:Object):void{
sessionStorage.setItem("user",JSON.stringify(user));
}

public clearSessionStorage():void{
  sessionStorage.removeItem("user");
}

}
