import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Result} from "../models/base-models/result";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {UpdatePersonalUserDto} from "../models/personal-user/update-personal-user-dto";
import {UpdatedPersonalUserDto} from "../models/personal-user/updated-personal-user-dto";
import {DataResult} from "../models/base-models/data-result";
import {UserDetailDto} from "../models/personal-user/user-detail-dto";


@Injectable({
  providedIn: 'root'
})
export class PersonalUserService {

  constructor(private http: HttpClient) {
  }

  public isVerified(): Observable<Result> {
    return this.http.get<Result>(environment.baseUrl + "personal-user/is-verified-user").pipe(
      tap({
        next: (result: Result) => {
          localStorage.setItem("isVerified", result.success.toString());
        },
        error: (error) => {
          localStorage.setItem("isVerified", "false");
        }
      }));
  }

  public updatePersonalUser(updatePersonalUserDto: UpdatePersonalUserDto): Observable<UpdatedPersonalUserDto> {
    return this.http.post<UpdatedPersonalUserDto>(environment.baseUrl + "personal-user", updatePersonalUserDto);
  }

  getUserDetail(): Observable<DataResult<UserDetailDto>> {
    return this.http.get<DataResult<UserDetailDto>>(environment.baseUrl + "personal-user/detail");
  }
}
