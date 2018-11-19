import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { User, Response } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;

  username: string;
  password: string;

  valid: boolean;
  response: Response;

  constructor(private dataService: DataService, public router: Router) { 
    this.valid = true;
    this.user = new User('', '', '', '');
  }
  
  ngOnInit() {
    this.dataService.response.subscribe(res => {
      this.response = res;
      this.valid = res.user ? true : false;

      if( res.user) {
        this.router.navigateByUrl('welcome');
      }
    });
  }

  login() {
    console.log('Login in progres...');
    this.dataService.login(this.user);
    console.log(this.username + ' ' + this.password);
  }
}
