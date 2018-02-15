import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityProvider } from '../../providers/utility/utility';


@Injectable()
export class ChatProvider {

  constructor(
     public http: HttpClient,
     public utilty: UtilityProvider) {
    
  }

  messageChatList(user_id:string){
  return this.utilty.getMethod('ActiveUsers/' + user_id);
  }

  friendsList(){
  return this.utilty.getMethod('ActiveUsers/0');
  }



  getPersonalMessages(chatid, offset){
    return this.utilty.getMethod('MessageDecription/'+ chatid +'/'+offset);
  }

  getGroupMessages(chatid, offset){
    return this.utilty.getMethod('groupMessageDescription/'+ chatid +'/'+offset);
  }


  sendMessage(message: string,reciever: string, sender: string,userid: string){
    return this.utilty.postMethod('sendMessage',{message:message,reciever:reciever,sender:sender,userid:userid});
  }

  sendGroupMessage(message: string,reciever:string,sender:string){
    return this.utilty.postMethod('sendGroupMessage',{message:message,reciever:reciever,sender:sender});
  }

}
