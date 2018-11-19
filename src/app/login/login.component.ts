import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  valid: boolean;
  error_msg: string;

  constructor() { 
    this.valid = true;
  }

  ngOnInit() {
  }

  login() {
    console.log('Login in progres...');
    console.log(this.username + ' ' + this.password);
  }
}
