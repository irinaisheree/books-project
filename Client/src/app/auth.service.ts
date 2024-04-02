import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserForAuth } from './types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userEmailSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private userSubject: BehaviorSubject<UserForAuth | null> = new BehaviorSubject<UserForAuth | null>(null);
  userEmail$: Observable<string | null> = this.userEmailSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  userId$: Observable<string | null> = this.userIdSubject.asObservable();
  user$: Observable<UserForAuth | null> = this.userSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.checkAuth();
  }

  setUser(user: UserForAuth): void {
    console.log(`setting user: ${user.email}`);
    this.userSubject.next(user);
    this.isLoggedInSubject.next(true); // Set isLoggedIn to true when user is set
  }

  getUser(): Observable<UserForAuth | null> {
    console.log('getting user:', this.userSubject.getValue()?.email);
    return this.userSubject.asObservable();
  }

  updateAuthStatus(isLoggedIn: boolean): void {
    console.log('Updating auth status:', isLoggedIn);
    this.isLoggedInSubject.next(isLoggedIn);
  }

  getAuthStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  setUserEmail(email: string | null): void {
    console.log('Setting user email:', email);
    localStorage.setItem('userEmail', email || '');
    this.userEmailSubject.next(email);
  }

  getUserEmail(): Observable<string | null> {
    console.log('Getting user email:', this.userEmailSubject.getValue());
    return this.userEmail$;
  }

  setUserId(userId: string | null): void {
    this.userIdSubject.next(userId);
    console.log('Setting user ID:', userId);
  }

  getUserIdFromToken(token: string): string | null {
    if (!token) {
      return null;
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    const userId = payload._id || null;

    return userId;
  }

  checkAuth(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = this.getUserIdFromToken(token);
      if (userId) {
        this.setUserId(userId);
      }
    }
  }

  logout(): Observable<any> {
    // Clear token and userEmail from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');

    // Update auth status to indicate the user is logged out
    this.updateAuthStatus(false);

    // Return an observable that completes immediately
    return of(null);
  }
}
