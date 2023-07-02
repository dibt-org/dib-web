import {Component, OnInit} from '@angular/core';
import {CorporateUserDetail} from "../../../../models/corporate/corporate-user-detail";
import {CorporateUserService} from "../../../../services/corporate-user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-corporate-user-detail',
  templateUrl: './corporate-user-detail.component.html',
  styleUrls: ['./corporate-user-detail.component.scss']
})
export class CorporateUserDetailComponent implements OnInit {

  corporateUser: CorporateUserDetail;

  constructor(private corporateUserService: CorporateUserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.corporateUserService.getDetail(params.get('username')!).subscribe({
        next: res => {
          this.corporateUser = res.data;
        },
        error: err => {
          console.log(err);
        }
      });
    });
  }

}
