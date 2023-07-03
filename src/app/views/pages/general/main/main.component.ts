import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostService} from "../../../../services/post.service";
import {GetAllPostDto} from "../../../../models/post/get-all-post-dto";
import {PersonalUserService} from "../../../../services/personal-user.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {GetCommentsDto} from "../../../../models/comments/get-comments-dto";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  posts: GetAllPostDto[] = [];
  selectedPost: GetAllPostDto;
  defaultNavActiveId = 1;
  comments: GetCommentsDto[] = [];
  loading = false;

  makeCommentLoading = false;

  constructor(private modalService: NgbModal, private postService: PostService, private userService: PersonalUserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.isVerified().subscribe(response => {
    });
    this.postService.getPosts().subscribe(response => {
      this.posts = response.data;
    });
    document.querySelectorAll('.chat-list .chat-item').forEach(item => {
      item.addEventListener('click', event => {
        document.querySelector('.chat-content')!.classList.toggle('show');
      })
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

  comment(commentModal: TemplateRef<any>, postId: number) {
    this.loading = true;
    this.modalService.open(commentModal, {size: 'xl'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {
    });
    this.postService.getComments(postId).subscribe({
      next: (response) => {
        console.log(response.data)
        this.comments = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  backToChatList() {
    document.querySelector('.chat-content')!.classList.toggle('show');
  }

  save() {
    console.log('passs');
  }

  makeComment(commentForm: NgForm) {
    if (commentForm.invalid) return;
    this.makeCommentLoading = true;
    this.postService.makeComment(this.selectedPost.id, commentForm.value.commentText).subscribe({
      next: (response) => {
        this.makeCommentLoading = false;
        this.postService.getComments(this.selectedPost.id).subscribe({
          next: (response) => {
            this.comments = response.data;
          },
          error: (error) => {
            console.log(error);
          }
        });
        commentForm.reset();
      },
      error: (error) => {
        this.makeCommentLoading = false;
        console.log(error);
      }
    });
  }
}

