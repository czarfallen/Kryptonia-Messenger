import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { ChatlistPage } from '../pages/chatlist/chatlist';
import { GroupchatPage } from '../pages/groupchat/groupchat';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { PersonalMessagePage } from '../pages/personal-message/personal-message';
import { CreateGroupPage } from '../pages/create-group/create-group';
import { GroupMessagesPage } from '../pages/group-messages/group-messages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { UtilityProvider } from '../providers/utility/utility';
import { ChatProvider } from '../providers/chat/chat';
import {SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = {url:'http://localhost:3000',options:{}};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChatlistPage,
    GroupchatPage,
    ProfilePage,
    LoginPage,
    PersonalMessagePage,
    CreateGroupPage,
    GroupMessagesPage

  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChatlistPage,
    GroupchatPage,
    ProfilePage,
    LoginPage,
    PersonalMessagePage,
    CreateGroupPage,
    GroupMessagesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UtilityProvider,
    ChatProvider
  ]
})
export class AppModule {}
