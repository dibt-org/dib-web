import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private router: Router,
              private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }


  onRegister(registerForm: NgForm) {
    this.isLoading = true;
    if (registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Lütfen formu eksiksiz doldurunuz.'
      }).then(r => {
        this.isLoading = false;
      })
      return;
    }
    this.authService.register(registerForm.value).subscribe({
      next: (data) => {
        this.router.navigate(['/auth/login']).then(r => {
          this.isLoading = false;
        });
      },
      error: (error: { error: { message: any; }; }) => {
        let errorMessage = error.error.message;
        switch (errorMessage) {
          case '[USERNAME_ALREADY_EXISTS]':
            errorMessage = 'Bu kullanıcı adı zaten kullanılıyor.';
            break;
          case '[EMAIL_ALREADY_EXISTS]':
            errorMessage = 'Bu email zaten kullanılıyor.';
            break;
          case '[USERNAME_ALREADY_EXISTS, EMAIL_ALREADY_EXISTS]':
            errorMessage = 'Bu kullanıcı adı ve email zaten kullanılıyor.';
            break;
          case 'VALIDATION_ERRORS':
            errorMessage = 'Lütfen formu eksiksiz doldurunuz.';
            break;
          default:
            errorMessage = 'Bir hata oluştu.';
            break;
        }
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage
          }
        ).then(r => {
          this.isLoading = false;
        })
      }
    });
  }
}
