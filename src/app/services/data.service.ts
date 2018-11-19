import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User, Response } from '../models';

@Injectable()
export class DataService {
  response: Observable<Response>;
  private _response: Subject<Response>;
  private dataStorage :User;

  referral: Observable<string>;
  private _referral: Subject<string>;

  private baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://referral-bf7dc.firebaseio.com/users/';
    this._response = new Subject<Response>();
    this.response = this._response.asObservable();

    this._referral = new Subject<string>();
    this.referral = this._referral.asObservable();
  }

  signUp(user: User) {
    this.http.get<User>(this.baseURL + user.username + '.json').subscribe(resp => {
      if (resp === null) {
        this.http.put(this.baseURL + user.username + '.json', user).subscribe(resp => {
          this._response.next(new Response(user, 'OK'));
        });
      } else {
        this._response.next(new Response(null, 'Username already in use.'));
      }
    });
  }

  login(user: User) {
    this.http.get<User>(this.baseURL + user.username + '.json').subscribe(resp => {
      if (resp === null) {
        this._response.next(new Response(null, 'The username does not exist.'));
      } else {
        if (resp.password === user.password) {
          this._response.next(new Response(user, 'OK'));
          this.dataStorage = resp;
        } else {
          this._response.next(new Response(null, 'Incorrect password.'));
        }
      }
    });
    return true;
  }

  getRef(code: string) {
    this.http.get<string>('https://us-central1-referral-bf7dc.cloudfunctions.net/getRefByCode', {
      params: { 'code': code },
      observe: 'body'
    }).subscribe(data => {
      this._referral.next(data);
    }, error => console.error(error)
    );
  }

  getUser(): User { return this.dataStorage; }
}
