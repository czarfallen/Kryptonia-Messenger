import { Component } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import {Socket} from 'ng-socket-io';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'page-group-messages',
  templateUrl: 'group-messages.html',
})
export class GroupMessagesPage {

  gid;
  offset:string = '5';
  GrpMessageDetails:any = [];
  messgs:any = [];
  userid;
  chatmessage:string = '';


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Chats: ChatProvider, public socket: Socket) {
    this.gid = this.navParams.get('gid');
    this.userid = this.navParams.get('userId');
    this.GrpMessageDetails = this.navParams.get('chatmessage');

 
    this.display();
    this.socket.on('group-chat-channel',mess => {
     
      this.messgs.push({
        message: mess.msg,
        sender: mess.sender

      }); 
    });
   
  }

 display(){
  let arrayC:any = [];
  let itemParse:string = '';
  this.Chats.getGroupMessages(this.gid,this.offset).subscribe(messages => {

    arrayC =  this.toArray(messages);      
    arrayC.forEach(element => {
      itemParse = JSON.parse(element);
  
      this.messgs.push({
        message: itemParse['msg'],
        sender: itemParse['sender']
      });
    });
   
  });
 }

 sendmessgeGroup(){

  this.Chats.sendGroupMessage(this.chatmessage, this.gid ,this.userid).subscribe((response)=>{

    console.log(response);
  });
 
   this.chatmessage = '';

 }

 public toArray(obj : any){
    var result = Object.keys(obj).map(function(key) {
      return obj[key];
    });
    return result;
  }

  doRefresh(event){
    let num:number;
    num = parseInt(this.offset)+5;
    this.offset = num.toString();
    
   
    setTimeout(() => {
    
      this.messgs = [];
      this.display();
      this.content.scrollToBottom(20);
      event.complete();
    }, 1000);
   
  }


}
