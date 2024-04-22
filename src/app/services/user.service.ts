import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}`).pipe(
      map((response: any) => response)
    );
  }

  getUserDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      tap(user => console.log('User details response:', user)), // Log the API response
      catchError(error => {
        console.error('Error fetching user details:', error);
        throw error;
      })
    );
  }
}
