import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {exhaustMap, Observable, take} from 'rxjs';
import {AuthModel} from "../../models/auth/auth-model";
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Kontrol edilecek URL'leri belirleyin (login ve register gibi)
    const excludedUrls = ['login', 'register'];

    // İstekin URL'sini alın
    const url = request.url.toLowerCase();

    // Eğer URL istisna listesinde yer alıyorsa, token eklemeyin
    if (excludedUrls.some(excludedUrl => url.includes(excludedUrl))) {
      return next.handle(request);
    }


    return this.authService.getAuthModel().pipe(take(1),
      exhaustMap(authModel => {
        if (!authModel) {
          return next.handle(request);
        }
        let newRequest: HttpRequest<any>;
        newRequest = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + authModel.accessToken)
        });
        return next.handle(newRequest);
      }));
  }
}


