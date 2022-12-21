import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BasketInfoService } from './basket-info.service';
import { FirebaseServiceService } from './firebase-service.service';
import { Roles } from './User';


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
    banned: false,
  }
  

  constructor(private fireauth: AngularFireAuth, private router: Router, private fb: FirebaseServiceService) 
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

  signOut(){
    return this.fireauth.signOut().then((event:any) => {
      this.router.navigate(['']);
    })
  }

  changePersistence(newPersistence: string){
    this.persistence = newPersistence;
  }

  GodCreateNewUser(mail: string, password: string){
    this.fireauth.createUserWithEmailAndPassword(mail, password)
    .then((userCredential) => {
      this.router.navigate(['wycieczki'])
    })
    .catch((error) => {
      alert("Taki użytkownik już istnieje");
    })
  }


  GodSignUser(mail: string, password: string){
    this.fireauth.signInWithEmailAndPassword(mail, password);
    this.router.navigate(['wycieczki']);
  }
}
