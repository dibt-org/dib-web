import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostService} from "../../../../services/post.service";
import {GetAllPostDto} from "../../../../models/post/get-all-post-dto";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  posts: GetAllPostDto[] = [];
  animationFadeoutExampleOptions: OwlOptions = {
    animateOut: 'fadeOut',
    items: 1,
    margin: 30,
    stagePadding: 30,
    smartSpeed: 450
  }
  autoPlayExampleOptions: OwlOptions = {
    items: 4,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  }
  slidesStore = [
    {
      id:'1',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_1',
      title:'Image_1'
    },
    {
      id:'2',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_2',
      title:'Image_3'
    },
    {
      id:'3',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_3',
      title:'Image_3'
    },
    {
      id:'4',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_4',
      title:'Image_4'
    },
    {
      id:'5',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_5',
      title:'Image_5'
    },
    {
      id:'6',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_6',
      title:'Image_6'
    },
    {
      id:'7',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_7',
      title:'Image_7'
    },
    {
      id:'8',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_8',
      title:'Image_8'
    },
    {
      id:'9',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_9',
      title:'Image_9'
    },
    {
      id:'10',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_10',
      title:'Image_10'
    },
    {
      id:'11',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_11',
      title:'Image_11'
    },
    {
      id:'12',
      src:'http://via.placeholder.com/265x167',
      alt:'Image_12',
      title:'Image_12'
    }
  ]

  constructor(private modalService: NgbModal, private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(response => {
      this.posts = response.data;
    });
  }

  openLgModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {
      console.log("Modal dismissed" + res)
    });
  }

}
