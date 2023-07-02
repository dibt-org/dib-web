import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SearchUser} from "../../../../models/user/search-user-dto";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  defaultNavActiveId = 1;
  searchResult: SearchUser[] = [];
  loading = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    // Show chat-content when clicking on chat-item for tablet and mobile devices
    document.querySelectorAll('.chat-list .chat-item').forEach(item => {
      item.addEventListener('click', event => {
        document.querySelector('.chat-content')!.classList.toggle('show');
      })
    });

  }

  // back to chat-list for tablet and mobile devices
  backToChatList() {
    document.querySelector('.chat-content')!.classList.toggle('show');
  }

  save() {
    console.log('passs');

  }

  searchUser(form: NgForm) {
    this.loading = true;
    this.userService.searchUser(form.value.search).subscribe({
      next: res => {
        this.searchResult = res.data;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      }
    });
  }

  detail(res: SearchUser) {
    if (res.type === 'CORPORATE_USER') {
      this.router.navigate(['/general/corporate-user-detail', res.username]);
    } else {
      this.router.navigateByUrl('/general/profile');
    }
  }
}
