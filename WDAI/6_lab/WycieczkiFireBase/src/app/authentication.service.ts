import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BasketInfoService } from './basket-info.service';
import { FirebaseServiceService } from './firebase-service.service';
import { Roles, User } from './User';
import { Wycieczka } from './wycieczki/wycieczki.component';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  persistence: string = 'local';

  userData: any = null;
  userRoles: Roles = {
    guest: true,
    admin: false,
    menager: false,
    client: false,
    banned: false
  };
  

  constructor(private fireauth: AngularFireAuth, private router: Router, private fb: FirebaseServiceService, private basket: BasketInfoService) 
  {
    fireauth.authState.subscribe(async (event: any) =>{
    if (event){
      this.userData = event;
      const roles = await this.fb.getUserRoles(event.uid);
      this.userRoles = roles as Roles;
    }
    else{
      this.userData = null;
      this.userRoles = {
        guest: true,
        admin: false,
        menager: false,
        client: false,
        banned: false
      }
    }
  }) }

  getuserData(){
    return this.fireauth.currentUser;
  }

  getAuthenticated() : Observable<any>{
    return this.fireauth.authState;
  }

  signOut(){
    return this.fireauth.signOut().then((event:any) => {
      this.router.navigate(['']);
    })
  }

  changePersistence(newPersistence: string){
    this.persistence = newPersistence;
  }

  GodCreateNewUser(mail: string, password: string){
    return this.fireauth.createUserWithEmailAndPassword(mail, password)
    .then((userCredential) => {
      let newUser = new User(userCredential.user);
      this.fb.addNewUser(newUser);
      this.router.navigate(['wycieczki']);
    })
    .catch((error) => {
      alert(error);
    })
  }


  GodSignUser(mail: string, password: string){
    return this.fireauth.setPersistence(this.persistence).then(()=>{
      return this.fireauth.signInWithEmailAndPassword(mail, password)
    .then((userCredential) => {
      this.router.navigate(['wycieczki'])
    })
    .catch((error) => {
      alert(error);
    })
    })
  }


}
