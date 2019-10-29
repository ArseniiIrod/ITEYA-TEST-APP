import { Injectable } from '@angular/core';
import { User, City } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userUrl = 'api/users';
  private citiesUrl = 'api/cities';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.citiesUrl);
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.userUrl)
      .pipe(catchError(this.handleError<User[]>('getUser', [])));
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.userUrl, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>('addUser')));
  }

  updateUser(user: User): Observable<any> {
    return this.http
      .put(this.userUrl, user, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateUser')));
  }

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.userUrl}/${id}`;
    return this.http
      .delete<User>(url, this.httpOptions)
      .pipe(catchError(this.handleError<User>('deleteUser')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
