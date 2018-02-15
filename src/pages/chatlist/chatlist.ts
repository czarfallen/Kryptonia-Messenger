import { Component } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { PersonalMessagePage } from '../personal-message/personal-message';


@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html',
})
export class ChatlistPage {

  user:string;
  chatHeadsContent:any = [];
  chatHeadear: any = [];

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private Chats: ChatProvider) {
    this.user = this.navParams.get('userId');
    
  }

  display(){
    let parseItem: string;
    this.chatHeadear = [];
    this.chatHeadsContent = [];
    let chatids: string;    
    this.Chats.messageChatList(this.user).subscribe((details)=>{
    
      details['chatHeads'].forEach(element => {

            element[0]['mess'].forEach(message => {
              parseItem = JSON.parse(message);

              chatids = parseItem['receiver']+'_'+parseItem['sender'];
              if(parseItem['receiver'] > parseItem['sender']){
              chatids = parseItem['sender']+'_'+parseItem['receiver'];
              }

              if(this.chatHeadear.indexOf(chatids) < 0){
                this.chatHeadear.push(chatids);            
                this.chatHeadsContent.push({
                 name: element[0]['name'][0]['name'],
                 chatid: chatids,
                 sender: parseItem['sender'],
                 receiver: parseItem['receiver']
              }); 
     
             }

              
            });
      });
   
     
    });
  }

  ionViewWillEnter(){
    this.display();
  }

  personalMsg(chatid,sender,rcvr){
    this.navCtrl.push(PersonalMessagePage,{
      chatid: chatid,
      userId:this.user,
      sender: sender,
      rcvr:rcvr
      });
  }

  removeConversation(chatId){
    this.Chats.deleteConversation(chatId).subscribe(Response=>{
      console.log(Response);
    });  
  }
  

}
