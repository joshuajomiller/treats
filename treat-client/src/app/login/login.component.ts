import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  remember: Boolean;
  showLogin: Boolean;

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit() {
    // this.email = 'email@person.com';
    // this.password = '12345';
    this.remember = true;
    this.showLogin = true;
  }

  login() {
    this.loginService.login(this.email, this.password, this.remember)
      .subscribe(userToken => {
        if (userToken && userToken.token) {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  register() {
    this.loginService.register(this.email, this.password, this.remember)
      .subscribe(userToken => {
        if (userToken && userToken.token) {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  toggleCard() {
    this.showLogin = !this.showLogin;
  }
}
