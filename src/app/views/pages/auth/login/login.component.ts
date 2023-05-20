import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {LoginModel} from "../../../../models/auth/login-model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(loginForm: NgForm) {
    //TODO it will be deleted
    console.log(loginForm.value)
    const loginModel: LoginModel = {username: loginForm.value.username, password: loginForm.value.password}
    this.authService.login(loginModel)

  }

}
