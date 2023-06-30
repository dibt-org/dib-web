import {Component, Input, OnInit} from '@angular/core';
import {UserDetailDto} from "../../../../../models/personal-user/user-detail-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonalUserService} from "../../../../../services/personal-user.service";

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent implements OnInit {
  bindingUser: UserDetailDto;

  constructor(private personalUserService: PersonalUserService) {
  }

  ngOnInit(): void {
    this.personalUserService.getUserDetail().subscribe({
      next: (result) => {
        this.bindingUser = result.data;

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
