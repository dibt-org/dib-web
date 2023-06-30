import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {never, Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {DataResult} from '../../../../models/base-models/data-result';
import {MentionConfig} from "angular-mentions";

interface PopupPosition {
  left: number;
  top: number;
}

@Component({
  selector: 'app-complaint-create',
  templateUrl: './complaint-create.component.html',
  styleUrls: ['./complaint-create.component.scss']
})
export class ComplaintCreateComponent implements OnInit {
  newComplaint = {
    title: '',
    content: '',
    files: []
  };

  httpItems: Observable<any>;
  private searchTermStream = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.httpItems = this.searchTermStream.pipe(
      tap((term) => {
        if (term) {
          this.getItems(term).subscribe((result) => {
            console.log(result);
            this.httpItems = new Observable<any[]>(observer => {
              observer.next(result.data);
              observer.complete();
            });
          });
        }
      })
    );
  }

  search(term: string): void {
    console.log(term);
    this.getItems(term).subscribe((result) => {
      console.log(result);
      this.httpItems = new Observable<any[]>(observer => {
        observer.next(result.data);
        observer.complete();
      });
    });
  }


  getItems(term: string): Observable<DataResult<String[]>> {
    console.log('getItems:', term);
    if (!term) {
      return new Observable<DataResult<String[]>>(observer => {
          observer.next({data: [], success: true, message: ''});
          observer.complete();
        }
      );
    }

    return this.http.get<DataResult<String[]>>(environment.baseUrl + 'user/query?query=' + term)
      .pipe(
        tap((result) => {
          console.log(result);
        })
      );
  }

  addComplaint(newComplaint: { files: any[]; title: string; content: string }): void {
    console.log(this.newComplaint);
  }
}
