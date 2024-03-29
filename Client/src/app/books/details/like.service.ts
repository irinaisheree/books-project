import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  likeBook(bookId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/books/${bookId}/like`, null);
  }

  unlikeBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/books/${bookId}/like`);
  }

  toggleLike(bookId: string): void {
    if (this.likedBooks.has(bookId)) {
      this.unlikeBook(bookId).subscribe(() => {
        this.likedBooks.delete(bookId);
        this.saveLikedBooks();
      });
    } else {
      this.likeBook(bookId).subscribe(() => {
        this.likedBooks.add(bookId);
        this.saveLikedBooks();
      });
    }
  }
}
