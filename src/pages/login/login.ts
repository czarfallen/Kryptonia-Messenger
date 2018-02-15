import { Component } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { UtilityProvider } from '../../providers/utility/utility';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:string;
  password:string;

  constructor( 
    private auth:AuthProvider,
    public util : UtilityProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    
    this.email = this.navParams.get('email');
    this.password = this.navParams.get('email');

  }

  login(){
    let HomeModal;
      this.auth.authentication(this.email,this.password).subscribe((credentials)=>{
        if(credentials['status']=='success'){
          this.navCtrl.setRoot(HomePage,{         
            userId: credentials['user']['id']
            });
          //this.util.PageControl(HomePage,{ userId: credentials['user']['id'] });
        }else{
          this.util.ToastMessage('Invalid Email or Password');
        }
      });
    
    
  }


  
    
}
