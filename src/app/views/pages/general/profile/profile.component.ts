import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonalUserService} from 'src/app/services/personal-user.service';
import {UserDetailDto} from "../../../../models/personal-user/user-detail-dto";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserDetailDto = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    birthDate: "",
    nationalityId: "",
    about: ""
  }

  constructor(private modalService: NgbModal, private personalUserService: PersonalUserService) {
  }

  ngOnInit(): void {
    this.personalUserService.getUserDetail().subscribe({
      next: (result) => {
        this.user = result.data;

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openLgModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {
    });
  }

}
