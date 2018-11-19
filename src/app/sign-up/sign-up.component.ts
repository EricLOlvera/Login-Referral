import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { User, Response } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User;

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
        this.router.navigateByUrl('home/login');
      }
    })
  }

  signUp (){
    console.log('Sign up ' + this.user.email + ' ' + this.user.username + ' ' + this.user.password);
    this.user.referral_code = this.createReferralCode();
    this.dataService.signUp(this.user);
  }

  private createReferralCode(): string {
    return 'SOMEREFF';
  }
}
