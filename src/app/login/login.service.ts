import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  constructor (){
    const token = localStorage.getItem('token'); //extrage prop token din localStorage
    // console.log(token);
    // console.log("token");
    if(token){
      this.isLoggedInSubject.next(true);
      this.tokenSubject.next(token);
    }
    
  }

  userHasLoggedIn(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
    this.tokenSubject.next(token);

    // Update the login status
    this.isLoggedInSubject.next(true);

    // Update the token
    this.tokenSubject.next(token);
  }

  getToken(): Observable<string> {
    return this.tokenSubject.asObservable();
  }
  userHasLoggedOut(): void {
    console.log('User has logged out');
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.tokenSubject.next('');
  }
}






// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable} from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

//   get isLoggedIn$(): Observable<boolean> {
//     return this.isLoggedInSubject.asObservable();
//   }

//   userHasLoggedIn(token: string): void {
//     localStorage.setItem('token', token);
//     this.isLoggedInSubject.next(true);
//     this.tokenSubject.next(token);

//     // Update the login status
//     this.isLoggedInSubject.next(true);

//     // Update the token
//     this.tokenSubject.next(token);
//   }

//   getToken(): Observable<string> {
//     return this.tokenSubject.asObservable();
//   }
//   userHasLoggedOut(): void {
//     console.log('User has logged out');
//     localStorage.removeItem('token');
//     this.isLoggedInSubject.next(false);
//     this.tokenSubject.next('');
//   }
// }
