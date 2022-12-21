import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  modelForm: FormGroup;
  mistake = false;
  okay = false;

  constructor(private formBuilder : FormBuilder, private auth: AngularFireAuth, private router: Router){}


  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
  })

}


onSubmit(data:any){
  this.mistake = false;
  this.okay = false;
  console.log(data.valid)

  if (!data.valid ){
    this.mistake = true;
    return
  }

  let newEmail = data.get("email").value;
  let newPassword = data.get("password").value;
  


  this.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then((userCredential) => {
      this.okay = true;
      this.router.navigate(['wycieczki'])
      data.reset();
    })
    .catch((error) => {
      this.mistake = true;
    })
  
 
  

}
}
