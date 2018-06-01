import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private userToken: string;
  constructor() {}

  public getUserToken(): string {
    this.userToken = this.userToken || localStorage.getItem('userToken');
    return this.userToken;
  }
  public setUserToken(userToken) {
    this.userToken = userToken;
    localStorage.setItem('userToken', userToken);
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
