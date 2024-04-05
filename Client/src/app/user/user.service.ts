import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/types/user';
import { environment } from '../environments/environments.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserProfile(userId: string): Observable<User> {
    const url = `${this.baseUrl}/auth/${userId}/profile`;
    return this.http.get<User>(url);
  }
  
}