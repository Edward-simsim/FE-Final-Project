import { Component, AfterViewInit } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  isLoggedIn: boolean = false;
  loggedInUserName: string = '';

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

  ngAfterViewInit(): void {
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn(): void {
    console.log("merge?");
    const checkGapi = (): void => {
      if (typeof google === 'undefined') {
        setTimeout(checkGapi, 100);
      } else {
        google.accounts.id.initialize({
          client_id: '585048238735-n4e8m2puplpnduoh3dfkss4i49mje46s.apps.googleusercontent.com',
          callback: this.onLoggedIn.bind(this)
        });
        google.accounts.id.prompt();
      }
    };

    checkGapi();
    console.log("merge2");
  }

  onLoggedIn(data: { credential: string }): void {
    console.log('onLoggedIn ', data.credential);
    this.loginService.userHasLoggedIn(data.credential)
    this.router.navigate(['/home']);
  }

  signOut(): void {
    console.log("merge");
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('token'), () => {
      this.loginService.userHasLoggedOut();
      this.router.navigate(['/']);
    });
  }
  
}



















