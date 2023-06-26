import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isLoggedInCredentialSubject: Subject<string> = new Subject<string>;

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get isLoggedInCredential$(): Observable<string>{
    return this.isLoggedInCredentialSubject.asObservable();
  }

  userHasLoggedIn(token: string): void {
    localStorage.setItem('token', token);

    // Update the login status
    this.isLoggedInSubject.next(true);
  }
}
