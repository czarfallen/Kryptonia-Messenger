import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { UtilityProvider } from '../../providers/utility/utility';

@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})

export class CreateGroupPage {

  userId;
  friendsList:any = [];
  Group:any = [];
  groupname;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Chats: ChatProvider,public util : UtilityProvider) {
  this.userId = this.navParams.get('userId'); 
  

    this.Chats.friendsList().subscribe((friends)=>{

        friends['offline'].forEach(element => {
        this.friendsList.push({
          name: element['name'],
          user_id: element['user_id'],
          active: 0
         });
      });

      friends['online'].forEach(element => {
        this.friendsList.push({
          name: element['name'],
          user_id: element['user_id'],
          active: 1
         });
      });

    });
  }

  isActive(index){
    if(this.Group.indexOf(index) < 0){
      return false;
    }else{
      return true;
    }
    
  }

  fabActive(){
    if(this.Group.length > 0){
      return false;
    }else{
      return true;
    }
   
  }

  addToGroup(id){
    if(this.Group.indexOf(id) < 0){
      this.Group.push(id);     
    }else{
      this.Group = this.Group.filter(item => item !== id);   
    }
    
  }

 test(){
 
 }
  CreateGroup(){
    this.Chats.createGroupMessage(this.groupname,this.Group,this.userId).subscribe(response => {
     
    });
    this.util.ToastMessage(this.groupname+' has been created.');
    this.groupname = '';
    this.Group = [];
  }



}
