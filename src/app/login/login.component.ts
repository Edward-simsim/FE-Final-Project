import { Component, AfterViewInit } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

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
      //   gapi.load('auth2', () => {
      //     gapi.auth2.init({
      //       client_id: '585048238735-n4e8m2puplpnduoh3dfkss4i49mje46s.apps.googleusercontent.com',
      //       scope: 'profile email',
      //       // Disable postMessage calls
      //       //To fix Cross-Origin Errors
      //       ux_mode: 'redirect',
      //       redirect_uri: 'postmessage',
      //     }).then(() => {
      //       this.renderGoogleSignInButton();
      //     });
      //   });
      // }
      }
    };

    checkGapi();
  }

  onLoggedIn(data: {credential: string}): void{
    console.log('onLoggedIn ', data.credential);
    
   this.loginService.userHasLoggedIn(data.credential)
  }
  

  // renderGoogleSignInButton() {
  //   gapi.signin2.render('google-sign-in-button', {
  //     scope: 'profile email',
  //     width: 240,
  //     height: 50,
  //     longtitle: true,
  //     theme: 'light',
  //     onsuccess: this.onSignIn.bind(this),
  //     onfailure: this.onSignInFailure.bind(this)
  //   });
  // }

  onSignIn(googleUser: any) {
    const idToken = googleUser.getAuthResponse().id_token;
    const profile = googleUser.getBasicProfile();
    const userName = profile.getName();
    this.loginService.userHasLoggedIn(idToken);
    this.showLoggedInModal(userName);
    this.router.navigate(['/home-page']);

  }

  onSignInFailure(error: any) {
    console.log('Sign-in failed:', error);
  }

  // showLoggedInModal() {
  //   const modalElement = document.getElementById('loggedInModal');
  //   if (modalElement) {
  //     modalElement.style.display = 'block';
  //   }
  // }

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


//LIBRARIE VECHE
  // initializeGoogleSignIn() {
  //   gapi.load('auth2', () => {
  //     gapi.auth2.init({
  //       client_id: '585048238735-n4e8m2puplpnduoh3dfkss4i49mje46s.apps.googleusercontent.com',
  //       scope: 'profile email'
  //     }).then(() => {
  //       this.renderGoogleSignInButton();
  //     });
  //   });
  // }

  // loadGoogleSignInScript() {
  //   const script = document.createElement('script');
  //   script.src = 'https://accounts.google.com/gsi/client';
  //   script.onload = () => {
  //     this.initializeGoogleSignIn();
  //   };
  //   document.body.appendChild(script);
  // }




 

  


  // initializeGoogleSignIn() {
  //   // Check if the gapi object exists
  //   // if (typeof gapi === 'undefined') {
  //   //   // Delay the initialization until the gapi object becomes available
  //   //   setTimeout(() => this.initializeGoogleSignIn(), 100);
  //   //   return;
  //   // }
  //   //console.log('Initializing Google Sign-In');
  //   gapi.load('auth2', () => {
  //     gapi.auth2.init({
  //       client_id: '585048238735-n4e8m2puplpnduoh3dfkss4i49mje46s.apps.googleusercontent.com',
  //       scope: 'profile email'
  //     }).then(() => {
  //       this.renderGoogleSignInButton();
  //       //console.log('Google Sign-In initialized.');
  //     });
  //   });
  // }




 
    //console.log('Google user signed in:', googleUser);
    // Get the user's ID token and profile information
    //send tge id_token to the BE
    // const idToken = googleUser.getAuthResponse().id_token;


    // const profile = googleUser.getBasicProfile();

    // Access the user's information
    // const userName = profile.getName();
    // const userEmail = profile.getEmail();
    //const userId = profile.getId();

    // Perform any actions you want with the user's information
    // For example, you can store the token in local storage, send it to the backend for verification, etc.

    // Example: Storing the token in local storage
    // localStorage.setItem('idToken', idToken);

    // Update component properties
    // this.isLoggedIn = true;
    //this.loggedInUserName = userName;
    //this.showLoggedInModal();
  

  // sendTokenToBackend(idToken: string) {
  //   // Send the idToken to your backend for verification
  //   const url = 'YOUR_BACKEND_URL'; // Replace with your backend URL
  //   this.http.post(url, { idToken }).subscribe(
  //     response => {
  //       // Handle the response from the backend
  //       console.log(response);
  //     },
  //     error => {
  //       // Handle any errors
  //       console.error(error);
  //     }
  //   );
  // }

 


