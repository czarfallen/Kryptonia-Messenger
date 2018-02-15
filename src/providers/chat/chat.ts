import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityProvider } from '../../providers/utility/utility';


@Injectable()
export class ChatProvider {

  constructor(
     public http: HttpClient,
     public utilty: UtilityProvider) {
    
  }

  messageChatList(user_id){
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

  sendMessage(message,reciever,sender,userid){
    return this.utilty.postMethod('sendMessage',{message,reciever,sender,userid});
  }

  sendGroupMessage(message,reciever,sender){
    return this.utilty.postMethod('sendGroupMessage',{message,reciever,sender});
  }

  createGroupMessage(name,userId,member){
    return this.utilty.postMethod('createGroupChat',{name,userId,member});
  }

  deleteConversation(chatid){
    return this.utilty.postMethod('removeConversation',{chatid});
  }

}
