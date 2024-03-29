import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private baseUrl = environment.apiUrl;
  private likedBooks: Set<string> = new Set<string>();

  constructor(private http: HttpClient) {
    this.loadLikedBooks();
  }

  private loadLikedBooks(): void {
    const storedLikedBooks = localStorage.getItem('likedBooks');
    if (storedLikedBooks) {
      this.likedBooks = new Set(JSON.parse(storedLikedBooks));
    }
  }

  private saveLikedBooks(): void {
    localStorage.setItem('likedBooks', JSON.stringify(Array.from(this.likedBooks)));
  }

  getLikedBooks(): Set<string> {
    return this.likedBooks;
  }

  isBookLiked(bookId: string): boolean {
    return this.likedBooks.has(bookId);
  }

  likeBook(userId: string, bookId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${userId}/liked/${bookId}`, null);
  }

  unlikeBook(userId: string, bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}/liked/${bookId}`);
  }

  toggleLike(userId: string, bookId: string): void {
    if (this.likedBooks.has(bookId)) {
      this.unlikeBook(userId, bookId).subscribe(() => {
        this.likedBooks.delete(bookId);
        this.saveLikedBooks();
      });
    } else {
      this.likeBook(userId, bookId).subscribe(() => {
        this.likedBooks.add(bookId);
        this.saveLikedBooks();
      });
    }
  }

  isBookLikedByUser(userId: string, bookId: string): Observable<boolean> {
    // Implement the logic to check if the book is liked by the user
    // For now, returning a dummy observable, replace with actual API call
    return of(this.likedBooks.has(bookId));
  }
}
