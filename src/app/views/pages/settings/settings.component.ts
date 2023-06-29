import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonalUserService} from "../../../services/personal-user.service";
import Swal from "sweetalert2";
import {UpdatePersonalUserDto} from "../../../models/personal-user/update-personal-user-dto";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  isLoading: boolean = false
  isVerified: boolean = false;

  constructor(private personalUserService: PersonalUserService) {

  }

  ngOnInit(): void {
    this.personalUserService.isVerified().subscribe({
      next: (response) => {
        this.isVerified = response.success;
      },
      error: (error) => {
        this.isVerified = false;
      }
    });
  }

  onVerify(verifyForm: NgForm) {
    this.isLoading = true;
    if (verifyForm.invalid) {
      Swal.fire({
        title: 'Hata!',
        text: "Lütfen tüm alanları doldurunuz.",
        icon: 'error',
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        this.isLoading = false;
        return;
      });
    }
    let user: UpdatePersonalUserDto = Object.assign({}, verifyForm.value)
    user.birthDate = this.getBirthDate(verifyForm.value.dp)
    console.log(user)
    this.personalUserService.updatePersonalUser(user).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Başarılı!',
          text: "Hesabınız başarıyla onaylandı.",
          icon: 'success',
          confirmButtonColor: '#3085d6',
        }).then((result) => {
            this.isLoading = false;
            this.isVerified = true;
            return;
          }
        )
      },
      error: (error) => {
        Swal.fire({
          title: 'Hata!',
          text: this.getErrorMessage(error.error.message),
          icon: 'error',
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          this.isLoading = false;
          return;
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // as dd.MM.yyyy
  private getBirthDate(dp: any): string {
    let day = dp.day.toString().length == 1 ? "0" + dp.day : dp.day;
    let month = dp.month.toString().length == 1 ? "0" + dp.month : dp.month;
    let year = dp.year;
    return day + "." + month + "." + year;
  }

  private getErrorMessage(message: string) {
    switch (message) {
      case "[NATIONAL_ID_ALREADY_TAKEN]":
        return "Bu TC Kimlik Numarası zaten kullanılmaktadır.";
      case "PERSONAL_USER_NOT_VALID":
        return "Girilen bilgiler hatalıdır.";
      default:
        return "Bilinmeyen bir hata oluştu.";
    }
  }
}
