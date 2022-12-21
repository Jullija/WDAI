import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs-compat';
import { Roles } from 'src/User';
import { BasketInfoService } from './basket-info.service';
import { FirebaseServiceService } from './firebase-service.service';

// @Injectable({
//   providedIn: 'root'
// })
export class AuthenticationService {
  userData: any = null;
  userRoles: Roles = {
    guest: true,
    admin: false,
    menager: false,
    client: false,
    banned: false,
  }
  

  constructor(private fireauth: AngularFireAuth, private router: Router, private fb=FirebaseServiceService, private basketInfoService = BasketInfoService) 
  {
    fireauth.authState.subscribe(async (event: any) =>{
    if (event){
      this.userData = event;
    }
    else{
      this.userData = null;
      this.userRoles = {
        guest: true,
        admin: false,
        menager: false,
        client: false,
        banned: false,
      }
    }
  }) }

  getuserData(){
    return this.fireauth.currentUser;
  }

  getAuthenticated() : Observable<any>{
    return this.fireauth.authState;
  }

  



}
