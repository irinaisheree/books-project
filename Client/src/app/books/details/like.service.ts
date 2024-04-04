import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  likeBook(userId: string, bookId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/users/${userId}/liked`, { bookId });
  }

  isBookLikedByUser(userId: string, bookId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/users/${userId}/liked/${bookId}`);
  }

  toggleLike(userId: string, bookId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/users/${userId}/liked`, { bookId });
  }

  fetchLikedBooksForUser(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/users/${userId}/liked`);
  }
}
