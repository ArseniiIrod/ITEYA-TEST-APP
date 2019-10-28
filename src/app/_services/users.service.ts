import { Injectable } from '@angular/core';
import { User, City } from '../_models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private userUrl = 'api/users';
  private citiesUrl = 'api/cities';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) {}

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.citiesUrl);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
      // .pipe(
      //   // tap(_ => console.log('fetched users')),
      //   catchError(this.handleError<User[]>('getUser', []))
      // );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions)
    .pipe(
      // tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      // catchError(this.handleError<User>('addUser'))
    );
  }

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      // tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  searchUser(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`${this.userUrl}/?name=${term}`).pipe(
      // tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      // this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
