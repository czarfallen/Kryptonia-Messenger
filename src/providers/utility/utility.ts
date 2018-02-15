import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';

let ApiUrl = 'http://127.0.0.1:8000/api/';

@Injectable()
export class UtilityProvider {

  constructor(
    public toastCtrl: ToastController,
    public http: HttpClient,
    public modalCtrl: ModalController) {
  
  }

  public postMethod(url : string, data  : any){
     return this.http.post(ApiUrl+url, data);
  }

  public getMethod(url : string){
    return this.http.get(ApiUrl+url)
  }

  ToastMessage(message:string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3500,
      position: 'bottom', 
    });
  
    toast.present();
  }

  PageControl(page: Page, data: any){
    let HomeModal;
    HomeModal = this.modalCtrl.create(page, data);
    HomeModal.present();
  }
}
