import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateGroupPage } from '../create-group/create-group';
import { ChatProvider } from '../../providers/chat/chat';
import { GroupMessagesPage } from '../group-messages/group-messages';
import { group } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html',
})
export class GroupchatPage {

  userId;
  groupName:any = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private Chats: ChatProvider) {
    this.userId = this.navParams.get('userId');

    this.Chats.messageChatList(this.userId).subscribe(groupchat => {
      
     groupchat['group'].forEach(element => {
      
        this.groupName.push({
          Gname:element['group_name'],
          Gid:element['group_id']
        });
     });

    });
    
  }

 
  startGroupChat(){
    this.navCtrl.setRoot(CreateGroupPage,{         
      userId: this.userId
      });
  }

  groupMessageDetails(grpid){
  
    this.navCtrl.push(GroupMessagesPage,{
      gid: grpid,
      userId: this.userId
      });


  }
}
