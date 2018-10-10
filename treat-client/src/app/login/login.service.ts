import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  login(email: string, password: string, remember: Boolean) {
    return this.http.post<UserToken>('/api/auth/login', {email: email, password: password})
      .pipe(
        tap(userToken => {
            this.authService.setUserToken(userToken.token, remember);
          }
        )
      );
  }

  register(email: string, password: string, remember: Boolean) {
    return this.http.post<UserToken>('/api/user', {email: email, password: password})
      .pipe(
        tap(userToken => {
            this.authService.setUserToken(userToken.token, remember);
          }
        )
      );
  }
}

class UserToken {
  token: string;
}
