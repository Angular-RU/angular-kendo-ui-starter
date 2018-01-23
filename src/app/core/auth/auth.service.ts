import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, single } from 'rxjs/operators';
const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class AuthService {
  baseUrl: string;
  auth_token: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  authenticate(username: string, password: string): Observable<boolean> {
    if (
      (username === 'manager' && password === 'mangersecret') ||
      (username === 'client' && password === 'clientsecret')
    ) {
      this.auth_token = 'test';
      return Observable.of(true);
    } else {
      this.authenticate = null;
      return Observable.of(false);
    }
  }

  logout() {
    this.auth_token = null;
  }

  get authenticated(): boolean {
    return this.auth_token != null;
  }

  clear() {
    this.auth_token = null;
  }
}
