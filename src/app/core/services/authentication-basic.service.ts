import {Injectable} from '@angular/core';
import {User} from '../../shared/models/user';
import {environment} from '../../../environments/environment';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class AuthenticationBasicService {

  private httpNoAuth: HttpClient;
  constructor(private http: HttpClient,
              httpBackend: HttpBackend) {
    this.httpNoAuth = new HttpClient(httpBackend);
  }

  login(username: string, password: string): Observable<User> {
    const authorization = this.generateAuthorization(username, password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization
      })
    };
    return this.httpNoAuth.get(`${environment.API}/identity`, httpOptions).pipe(
      map(data => {
        const user: User = new User(data);
        user.authorization = authorization;
        user.password = password;
        return user;
      })
    );
  }

  generateAuthorization(username: string, password: string): string {
    return `Basic ${btoa(`${username}:${password}`)}`;
  }

  storeCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User {
    return new User(JSON.parse(localStorage.getItem('currentUser')));
  }

  isAdmin(): boolean {
    const user: User = this.getCurrentUser();
    return this.isLoggedIn() && user.authorities[0].authority === 'ROLE_ADMIN';
  }
}
