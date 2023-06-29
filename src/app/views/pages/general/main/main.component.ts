import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostService} from "../../../../services/post.service";
import {GetAllPostDto} from "../../../../models/post/get-all-post-dto";
import {PersonalUserService} from "../../../../services/personal-user.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  posts: GetAllPostDto[] = [];


  constructor(private modalService: NgbModal, private postService: PostService, private userService: PersonalUserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.isVerified().subscribe(response => {
    });
    this.postService.getPosts().subscribe(response => {
      this.posts = response.data;
    });
  }

  openLgModal(content: TemplateRef<any>) {
    this.userService.isVerified().subscribe(
      {
        next: (response) => {
          if (response.success) {
            this.modalService.open(content, {size: 'lg'}).result.then((result) => {
              console.log("Modal closed" + result);
            }).catch((res) => {
              console.log("Modal dismissed" + res)
            });
          } else this.swal();
        },
        error: (error) => {
          this.swal()
        }
      });
  }

  private swal() {
    Swal.fire({
      title: 'Hesabınızı onaylamadınız!',
      text: "Hesabınızı onaylamak için lütfen profilinize gidin ve onaylayın.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/general/settings"]).then(r => console.log("profile page opened"));
        }
      }
    )
  }
}
