import { Component } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { ViewChild } from '@angular/core';
import {Socket} from 'ng-socket-io';


@Component({
  selector: 'page-personal-message',
  templateUrl: 'personal-message.html',
})
export class PersonalMessagePage {

  user;
  chatid;
  MesDetails:any = [];
  chatmessage:string = '';
  rcvr:string = '';
  sender:string;
  offset : any;

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private Chats: ChatProvider,  public socket: Socket) {

    this.sender = this.navParams.get('sender');
    this.rcvr = this.navParams.get('rcvr');
    this.chatid = this.navParams.get('chatid');
    this.user = this.navParams.get('userId');


    this.chatmessage = this.navParams.get('chatmessage');
    this.offset = '5';
    this.display();
    
    this.socket.on('private-chat-channel',mess => {
      this.MesDetails.push({
        message: mess.msg,
        sender: mess.sender   

      }); 
    });


  }

  display(){
    let itemParse:string = '';

    this.Chats.getPersonalMessages(this.chatid, this.offset).subscribe((message)=>{
  
      message['chats'].forEach(elem => {
        itemParse = JSON.parse(elem);

        this.MesDetails.push({
          message: itemParse['msg'],
          sender: itemParse['sender']      
        });


        
      });
    });



  }

  doRefresh(event){
    let num:number;
    num = parseInt(this.offset)+5;
    this.offset = num.toString();
    
   
    setTimeout(() => {
    
      this.MesDetails = [];
      this.display();
      this.content.scrollToBottom(20);
      event.complete();
    }, 1000);
   
  }

  SendMessage(){

    this.Chats.sendMessage(this.chatmessage,this.rcvr,this.sender, this.user).subscribe((response)=>{
     
    });
   
     this.chatmessage = '';
  }

}
