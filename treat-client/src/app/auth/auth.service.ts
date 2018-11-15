import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private userToken: string;
  private user;

  constructor() {
  }

  public getUserToken(): string {
    this.userToken = this.userToken || localStorage.getItem('userToken');
    return this.userToken;
  }

  public getUserEmail(): string {
    return this.user.email;
  }

  public setUserToken(userToken, remember) {
    this.userToken = userToken;
    if (remember) {
      localStorage.setItem('userToken', userToken);
    }
  }

  public setUser(user) {
    this.user = user;
  }

  public isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService;
    const userToken = this.getUserToken();
    try {
      return jwtHelper.isTokenExpired(userToken);
    } catch (err) {
      return false;
    }
  }
}
