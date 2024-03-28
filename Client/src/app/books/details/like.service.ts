import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private baseUrl = environment.apiUrl;
  private likedBooks: Set<string> = new Set<string>();
  private likedBooksSubject: BehaviorSubject<Set<string>>;

  constructor(private http: HttpClient) {
    const storedLikedBooks = localStorage.getItem('likedBooks');
    if (storedLikedBooks) {
      this.likedBooks = new Set(JSON.parse(storedLikedBooks));
    }
    this.likedBooksSubject = new BehaviorSubject<Set<string>>(this.likedBooks);
  }

  getLikedBooks(): Observable<Set<string>> {
    return this.likedBooksSubject.asObservable();
  }

  isBookLiked(bookId: string): boolean {
    return this.likedBooks.has(bookId);
  }

  likeBook(bookId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/books/${bookId}/like`, null);
  }
 
  // unlikeBook(bookId: string): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/books/${bookId}/like`);
  // }

  private saveLikedBooks(): void {
    localStorage.setItem('likedBooks', JSON.stringify(Array.from(this.likedBooks)));
    this.likedBooksSubject.next(this.likedBooks);
  }
}
