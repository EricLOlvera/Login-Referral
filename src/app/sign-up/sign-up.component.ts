import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { User, Response } from '../models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User;

  valid: boolean;
  response: Response;

  constructor(private dataService: DataService, public router: Router, private route: ActivatedRoute) {
    this.valid = true;
    this.user = new User('', '', '', '', null);
  }

  ngOnInit() {
    this.dataService.response.subscribe(res => {
      this.response = res;
      this.valid = res.user ? true : false;

      if (res.user) {
        this.router.navigateByUrl('home/login');
      }
    });

    this.dataService.referral.subscribe(res => {
      console.log('Referred : ' + res);
      this.user.referred_by = res;
    });

    this.route.params.subscribe(params => {
      if(params['code'])
        this.dataService.getRef(params['code']);
      });
  }

  signUp() {
    console.log('Sign up ' + this.user.email + ' ' + this.user.username + ' ' + this.user.password);
    this.user.referral_code = this.createReferralCode();
    this.dataService.signUp(this.user);
  }

  private createReferralCode(): string {
    return this.user.username.split('').reduce((acc, cur) => acc = acc + (cur.charCodeAt(0) - 97), '');
  }
}
