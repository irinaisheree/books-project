import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;


  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = this.decodeToken(token);

      if (decodedToken) {
        this.user = {
          _id: decodedToken._id,
          email: decodedToken.email,
          password: decodedToken.password,
          token: token,
          // Add other properties as needed
        };

        // Call method to get user's profile
        this.getUserProfile(this.user._id);
      } else {
        console.error('Failed to decode token');
      }
    } else {
      console.error('Token not found');
    }
  }

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(window.atob(base64));
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserProfile(userId: string): void {
    this.userService.getUserProfile(userId).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

}
