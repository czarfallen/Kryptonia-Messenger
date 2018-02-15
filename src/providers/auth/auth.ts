import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityProvider } from '../../providers/utility/utility';

@Injectable()
export class AuthProvider {

  constructor(
    public http: HttpClient,
    public utilty: UtilityProvider
  ) {
   
  }

  authentication(email: string, pass: string){
    return this.utilty.postMethod('login',{email :email, password :pass});
  }

}
