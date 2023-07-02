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
import {MapDto} from "../models/corporate/map-dto";


@Injectable({
  providedIn: 'root'
})
export class CorporateUserService {

  constructor(private http: HttpClient) {
  }

  getMapData(): Observable<DataResult<MapDto[]>> {
    return this.http.get<DataResult<MapDto[]>>(environment.baseUrl + "corporate-user/map");
  }
}
