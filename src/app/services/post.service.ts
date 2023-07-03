import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResult} from "../models/base-models/data-result";
import {GetAllPostDto} from "../models/post/get-all-post-dto";
import {environment} from "../../environments/environment";
import {AddedPostDto} from "../models/post/added-post-dto";
import {GetCommentsDto} from "../models/comments/get-comments-dto";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<DataResult<GetAllPostDto[]>> {
    return this.http.get<DataResult<GetAllPostDto[]>>(environment.baseUrl + "post");
  }

  getPostByUser(userId: number): Observable<DataResult<GetAllPostDto[]>> {
    return this.http.get<DataResult<GetAllPostDto[]>>(environment.baseUrl + `post/get-user-posts?userId=${userId}`);
  }

  public post(formData: FormData): Observable<DataResult<AddedPostDto>> {
    return this.http.post<DataResult<AddedPostDto>>(environment.baseUrl + 'post', formData);
  }

  public getComments(postId: number): Observable<DataResult<GetCommentsDto[]>> {
    return this.http.get<DataResult<GetCommentsDto[]>>(environment.baseUrl + `comment?postId=${postId}`);
  }

  makeComment(id: number, value: string) {
    const body = {
      postId: id,
      content: value
    }
    return this.http.post(environment.baseUrl + 'comment', body);
  }
}
