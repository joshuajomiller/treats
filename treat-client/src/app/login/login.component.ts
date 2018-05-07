import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  remember: Boolean;

  constructor(
    private loginService: LoginService,
    ) { }

  ngOnInit() {
    this.email = 'email@person.com';
    this.password = '12345';
    this.remember = true;
  }

  login() {
    this.loginService.login(this.email, this.password, this.remember)
      .subscribe(token => {
        console.log(token);
      });
  }
}
