import {Component, OnInit} from '@angular/core';
import {GetAllPostDto} from "../../../../../models/post/get-all-post-dto";
import {PostService} from "../../../../../services/post.service";
import {UserDetailDto} from "../../../../../models/personal-user/user-detail-dto";
import {PersonalUserService} from "../../../../../services/personal-user.service";

@Component({
  selector: 'app-profile-timeline',
  templateUrl: './profile-timeline.component.html',
  styleUrls: ['./profile-timeline.component.scss']
})
export class ProfileTimelineComponent implements OnInit {

  userPosts: GetAllPostDto[];
  user: UserDetailDto;

  constructor(private postService: PostService, private personalUserService: PersonalUserService) {
  }

  ngOnInit(): void {
    this.personalUserService.getUserDetail().subscribe(
      {
        next: (response) => {
          this.postService.getPostByUser(response.data.id).subscribe({
            next: (result) => {
              this.userPosts = result.data;
            },
            error: (error) => {
              console.log(error);
            }
          });
        },
        error: (error) => {
          console.log(error);
        }

      }
    )

  }
}
