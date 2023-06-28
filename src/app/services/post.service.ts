import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResult} from "../models/base-models/data-result";
import {GetAllPostDto} from "../models/post/get-all-post-dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<DataResult<GetAllPostDto[]>> {
    return this.http.get<DataResult<GetAllPostDto[]>>(environment.baseUrl + "post");
  }
}
