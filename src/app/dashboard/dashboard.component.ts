import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as QRCode from 'qrcode';
import { User } from '../models';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user: User;
  private ref_link: string;

  @ViewChild("qr") qr: ElementRef;

  constructor(private dataService: DataService, public router: Router) { 
    this.user = dataService.getUser();
    if(!this.user) router.navigateByUrl('/');
  }

  ngOnInit() {
    this.ref_link = 'https://referral-bf7dc.firebaseapp.com/home/sign-up/' + this.user.referral_code;
  }

  ngAfterViewInit() {
    let context: CanvasRenderingContext2D = this.qr.nativeElement.getContext("2d");
    
    QRCode.toCanvas(this.qr.nativeElement, this.ref_link, error => {
      if(error) console.log(error);
    });
  }

  copyRefLink() {
    let temp = document.createElement('textarea');
    temp.style.position = 'fixed';
    temp.style.left = '0';
    temp.style.top = '0';
    temp.style.opacity = '0';
    temp.value = this.ref_link;
    document.body.appendChild(temp);
    temp.focus();
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
  }

}
