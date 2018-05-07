import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string, remember: Boolean) {
    return this.http.post('/api/auth/login', {email: email, password: password});
  }
}
