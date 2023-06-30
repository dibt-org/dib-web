import {Component, OnInit, ViewChild, ElementRef, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {PersonalUserService} from "../../../services/personal-user.service";
import {UserDetailDto} from "../../../models/personal-user/user-detail-dto";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: UserDetailDto = {
    id: 0,
    firstName: "",
    lastName: "",
    nationalityId: "",
    birthDate: "",
    email: "",
    username: "",
    about: ""
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private auth: AuthService,
    private personalUserService: PersonalUserService
  ) {
  }

  ngOnInit(): void {
    this.personalUserService.getUserDetail().subscribe({
      next: (result) => {
        this.user = result.data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        localStorage.setItem("user", JSON.stringify(this.user));
      }
    })
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    this.auth.logout();
    localStorage.removeItem('auth');
    if (!localStorage.getItem('auth')) {
      this.router.navigate(['/auth/login']).then(r => console.log(r));
    }
  }

}
