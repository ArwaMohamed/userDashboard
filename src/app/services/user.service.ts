import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}`).pipe(
      map((response: any) => response.data)
    );
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`).pipe(
      map((response: any) => response.data)
    );
  }
}
