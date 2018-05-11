import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable()
export class LoginService {

  public userToken: string;

  constructor(private http: HttpClient) {
    this.userToken = localStorage.getItem('userToken');
  }

  login(email: string, password: string, remember: Boolean) {
    return this.http.post<UserToken>('/api/auth/login', {email: email, password: password})
      .pipe(
        tap(userToken => {
          this.userToken = userToken.token;
          if (remember) {
            localStorage.setItem('userToken', userToken.token);
          }
        })
      );
  }
}

class UserToken {
  token: string;
}
