import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { PersonalMessagePage } from '../personal-message/personal-message';
import { GroupMessagesPage } from '../group-messages/group-messages';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user:string;
  UserAvailableOffline:any = [];
  UserAvailableOnline:any = [];
  ChatAvailable:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private Chats: ChatProvider) {
    this.user = this.navParams.get('userId');
   

  }

  ionViewWillEnter(){
    let chatidOffline: string;
    let chatidOnline: string;
    this.UserAvailableOffline = [];
    this.UserAvailableOnline = [];
    this.ChatAvailable = [];
    this.Chats.friendsList().subscribe((list)=>{

      list['offline'].forEach(offval => {
        chatidOffline = this.user+'_'+offval['user_id'];
        if(this.user > offval['user_id'])
        {
          chatidOffline = offval['user_id']+'_'+this.user;
        }
        this.UserAvailableOffline.push({
            name: offval['name'],
            chatid: chatidOffline,
            sender: this.user,
            receiver: offval['user_id']
        });
      });

      list['online'].forEach(offval => {
        chatidOnline = this.user+'_'+offval['user_id'];
        if(this.user > offval['user_id'])
        {
          chatidOnline = offval['user_id']+'_'+this.user;
        }
        this.UserAvailableOnline.push({
          name: offval['name'],
          chatid: chatidOffline,
          sender: this.user,
          receiver: offval['user_id']
        });
      });

      list['group'].forEach(offval => {
        this.ChatAvailable.push({
          name: offval['group_name'],
          gid: offval['group_id']
        });
      });

});
  }
  personalMsg(chatid,sender,rcvr){
    this.navCtrl.push(PersonalMessagePage,{
      chatid: chatid,
      userId:this.user,
      sender: sender,
      rcvr:rcvr
      });
  }

  groupMessageDetails(grpid){

    this.navCtrl.push(GroupMessagesPage,{
      gid: grpid,
      userId: this.user
      });

  }


}
