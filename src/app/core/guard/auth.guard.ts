import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../../services/auth/auth.service";
import {Observable, tap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getAuthModel().pipe(map(auth => {
      return !!auth.accessToken;
    }), tap(isAuth => {
      if (!isAuth) {
        this.router.navigate(['/auth/login']).then(r => console.log(r));
      }
    }))
  }

}

