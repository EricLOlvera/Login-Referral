import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  email: string;
  username: string;
  password: string;

  valid: boolean;
  error_msg: string;

  constructor() { 
    this.valid = true;
  }

  ngOnInit() {
  }

  sign_up (){
    console.log('Sign up ' + this.email + ' ' + this.username + ' ' + this.password)
  }
}
