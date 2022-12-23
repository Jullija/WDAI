import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  modelForm: FormGroup;
  mistake = false;
  okay = false;

  constructor(private formBuilder : FormBuilder, private auth: AuthenticationService, private router: Router){}


  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
  })

}


onSubmit(data:any){
  this.mistake = false;
  this.okay = false;


  if (!data.valid ){
    this.mistake = true;
    return;
  }

  let newEmail = data.get("email").value;
  let newPassword = data.get("password").value;
  
  this.auth.GodCreateNewUser(newEmail, newPassword); 
  data.reset();
  

}
}
