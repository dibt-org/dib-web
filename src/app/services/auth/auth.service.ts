import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap, catchError} from "rxjs/operators";
import {Observable, throwError, BehaviorSubject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

import {environment} from "../../../environments/environment";
import {DataResult} from "../../models/base-models/data-result";
import {LoginModel} from "../../models/auth/login-model";
import {TokenModel} from "../../models/auth/token-model";
import {AuthModel} from "../../models/auth/auth-model";
import {RegisterModel} from "../../models/auth/register-model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authModel: BehaviorSubject<AuthModel> = new BehaviorSubject<AuthModel>(new AuthModel("", "", 0));
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
  }

  public login(loginModel: LoginModel): Observable<DataResult<TokenModel>> {
    return this.http.post<DataResult<TokenModel>>(
      environment.baseUrl + "auth/login",
      loginModel
    ).pipe(
      tap((dataResult: DataResult<TokenModel>) => {
        const tokenModel: TokenModel = dataResult.data;
        const decodedAccessToken = this.jwtHelperService.decodeToken(tokenModel.access_token);
        const authModel: AuthModel = new AuthModel(
          tokenModel.access_token,
          tokenModel.refresh_token,
          decodedAccessToken.exp
        );
        this.authModel.next(authModel);
        this.saveAuthModelToLocalStorage(authModel);
        this.setAutoLogoutTimer(decodedAccessToken.exp * 1000);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  public autoLogin(): void {
    const authModelString = localStorage.getItem('auth');
    console.log("authModelString: ", authModelString)
    if (authModelString) {
      const a = JSON.parse(authModelString);
      const authModel: AuthModel = new AuthModel(a._access_token, a._refresh_token, a._access_expires_in);
      const token = authModel.accessToken;
      if (token && !this.jwtHelperService.isTokenExpired(token)) {
        this.authModel.next(authModel);
        const expirationTime = this.jwtHelperService.getTokenExpirationDate(token)?.getTime() ?? 0;
        this.setAutoLogoutTimer(expirationTime);
        console.log("Token is not expired")
      } else {
        console.log("Token is expired")
        this.logout();
      }
    }
  }

  public logout(): void {
    const accessToken = this.authModel.value?.accessToken;
    if (!accessToken) {
      this.completeLogout();
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    this.http.post<any>(environment.baseUrl + "auth/logout", {}).subscribe({
      next: () => {
        this.completeLogout();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Logout completed");
      }
    });
  }

  private completeLogout(): void {
    this.authModel.next(new AuthModel("", "", 0));
    this.clearAutoLogoutTimer();
    this.removeAuthModelFromLocalStorage();
  }


  private setAutoLogoutTimer(expirationTime: number): void {
    const currentTime = new Date().getTime();
    const timeToExpiration = expirationTime - currentTime <= 0 ? 0 : expirationTime - currentTime;

    this.clearAutoLogoutTimer();

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, timeToExpiration);
  }

  private clearAutoLogoutTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  private saveAuthModelToLocalStorage(authModel: AuthModel): void {
    localStorage.setItem('auth', JSON.stringify(authModel));
  }

  private removeAuthModelFromLocalStorage(): void {
    localStorage.removeItem('auth');
  }

  getAuthModel() {
    return this.authModel.asObservable();
  }

  public register(registerModel: RegisterModel): Observable<DataResult<TokenModel>> {
    return this.http.post<DataResult<TokenModel>>(environment.baseUrl + "auth/register", registerModel);
  }
}
