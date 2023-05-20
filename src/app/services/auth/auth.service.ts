import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../../models/auth/login-model";
import {environment} from "../../../environments/environment";
import {DataResult} from "../../models/base-models/data-result";
import {TokenModel} from "../../models/auth/token-model";
import {BehaviorSubject, catchError, Observable, Subscription, tap, throwError} from "rxjs";
import {AuthModel} from "../../models/auth/auth-model";
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authModel: BehaviorSubject<AuthModel> = new BehaviorSubject<AuthModel>(
    new AuthModel("", "", 0, new Date())
  )
  test: Subscription


  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
  }

  login(loginModel: LoginModel): Observable<DataResult<TokenModel>> {
    return this.http.post<DataResult<TokenModel>>(environment.baseUrl + "auth/login", loginModel).pipe(
      tap((dataResult: DataResult<TokenModel>) => {
          console.log(dataResult)
          const tokenModel: TokenModel = dataResult.data
          const decodedToken = this.jwtHelperService.decodeToken(tokenModel.access_token)
          const authModel: AuthModel = new AuthModel(tokenModel.access_token, tokenModel.refresh_token, decodedToken.exp, new Date(decodedToken.exp * 1000))
          this.authModel.next(authModel)
          console.log(this.authModel.value)
        }
      ),
      map((dataResult: DataResult<TokenModel>) => {
        return dataResult
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }
}
