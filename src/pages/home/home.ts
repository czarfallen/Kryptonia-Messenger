import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { ChatlistPage } from '../chatlist/chatlist';
import { GroupchatPage } from '../groupchat/groupchat';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root = ChatlistPage;
  tab2Root = GroupchatPage;
  tab3Root = ProfilePage;
  userId:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    
    this.userId = this.navParams.get('userId');
     

  }

}
