import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: Text, password: Text) {
    return this.http.post<any>('/api/login', {username: username, password: password});
  }
}
