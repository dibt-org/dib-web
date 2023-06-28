import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {LoginModel} from "../../../../models/auth/login-model";
import Swal from "sweetalert2";
import * as constants from "../../../../core/constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  isLoading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(loginForm: NgForm) {
    this.isLoading = true;
    const loginModel: LoginModel = {username: loginForm.value.username, password: loginForm.value.password}
    this.authService.login(loginModel).subscribe({
      next: (data) => {
        console.log("login compo", data)
        this.router.navigate([this.returnUrl]).then(r => {
          this.isLoading = false;
        });
      },
      error: (error: { error: { message: any; }; }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message === constants.INVALID_CREDENTIALS ? 'Bilgilerinizi kontrol ediniz.' : 'Bir hata oluştu.'
        }).then(r => {
          this.isLoading = false;
        })
      },
      complete: () => {
        this.isLoading = false;
      }
    })

  }

}
