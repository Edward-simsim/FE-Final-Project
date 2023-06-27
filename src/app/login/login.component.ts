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
  }

  onLoggedIn(data: { credential: string }): void {
    console.log('onLoggedIn ', data.credential);
    this.loginService.userHasLoggedIn(data.credential);
    this.router.navigate(['/home']);
  }



  // onSignIn(googleUser: any) {
  //   console.log("signed in");
  //   const idToken = googleUser.getAuthResponse().id_token;
    
  //   this.loginService.userHasLoggedIn(idToken);
    
  // }

  onSignInFailure(error: any) {
    console.log('Sign-in failed:', error);
  }


  showLoggedInModal(userName: string) {
    const modalElement = document.getElementById('loggedInModal');
    if (modalElement) {
      const userNameElement = modalElement.querySelector('#userName');
      if (userNameElement) {
        userNameElement.textContent = `Signed in as ${userName}`;
      }
      modalElement.style.display = 'block';
    }
  }

}



















