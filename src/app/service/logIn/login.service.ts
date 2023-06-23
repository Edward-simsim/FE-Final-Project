import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  userHasLoggedIn(token: string): void {
    // Perform any actions you want when the user logs in, such as storing the token or updating the login status
    // For example, you can save the token to localStorage:
    localStorage.setItem('token', token);

    // Update the login status
    this.isLoggedInSubject.next(true);
  }
}
