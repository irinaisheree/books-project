import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserService } from '../user.service';
import { UserForAuth } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserForAuth | null = null;
  likedBooks: any[] = [];
  createdBooks: any[] = [];

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (user: UserForAuth | null) => {
        this.user = user;
        console.log("user:", user)
        if (user) {
          this.userService.getUserProfile(user._id).subscribe(
            (userData: any) => {
              console.log("userdata", userData)
              this.likedBooks = userData.likedBooks;
              this.createdBooks = userData.createdBooks;
            },
            (error) => {
              console.error('Error fetching user data:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}
