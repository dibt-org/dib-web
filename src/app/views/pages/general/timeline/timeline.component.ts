import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../../services/post.service";
import {GetAllPostDto} from "../../../../models/post/get-all-post-dto";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  userPosts: GetAllPostDto[];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (result) => {
        this.userPosts = result.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
