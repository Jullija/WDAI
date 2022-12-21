import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FirebaseServiceService } from '../firebase-service.service';
import { User } from '../User';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit{

  constructor(public auth: AuthenticationService, private fb:FirebaseServiceService){}

  users: User[] = [];

  ngOnInit(): void {
    this.fb.getUsers().subscribe((users) => {
      this.users = [];
      for (let user of users){
        let newUser = new User(user.payload.val());
        newUser.uid = user.payload.key || 'undefined';
        this.users.push(newUser);
      }
    })
  }


  banUser(uid: string){
    this.fb.changeUserRole(uid, 'banned', 'true');
  }

  setUserRole(uid: string, role: string, value: boolean){
    this.fb.changeUserRole(uid, role, String(value));
  }
}
