import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(''); // Add this line

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  userHasLoggedIn(token: string): void {
    localStorage.setItem('token', token);

    // Update the login status
    this.isLoggedInSubject.next(true);

    // Update the token
    this.tokenSubject.next(token); // Update this line
  }

  getToken(): Observable<string> {
    return this.tokenSubject.asObservable();
  }
}
