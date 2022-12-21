import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modelForm: FormGroup;
  error = false;
  okay = false;

  constructor(private formBuilder : FormBuilder, private auth: AngularFireAuth, private router: Router){}


  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  })

}


onSubmit(data:any){
  this.error = false;
  this.okay = false;

  if (!data.valid ){
    this.error = true;
    return
  }

  let newEmail = data.get("email").value;
  let newPassword = data.get("password").value;

  this.auth.signInWithEmailAndPassword(newEmail, newPassword);
  this.router.navigate(['wycieczki']);
  this.okay = true;
  data.reset();
}
}
