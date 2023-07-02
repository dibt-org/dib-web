import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchUser} from "../models/user/search-user-dto";
import {environment} from "../../environments/environment";
import {DataResult} from "../models/base-models/data-result";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public searchUser(query: string): Observable<DataResult<SearchUser[]>> {
    return this.http.get<DataResult<SearchUser[]>>(environment.baseUrl + `user/search?query=${query}`);
  }
}
