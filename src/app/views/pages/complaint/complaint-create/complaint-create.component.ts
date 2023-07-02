import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {DataResult} from '../../../../models/base-models/data-result';
import {MentionConfig} from "angular-mentions";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";

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
  files: File[] = [];
  mentions: { label: string }[] = [];
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
      });
    }

    return this.http.get<DataResult<String[]>>(environment.baseUrl + 'user/query?query=' + term)
      .pipe(
        tap((result) => {
          console.log(result);
        })
      );
  }

  addComplaint(postForm: NgForm) {
    if (postForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Lütfen tüm alanları doldurunuz!',
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }

      });

      return;
    }

    const formData = new FormData();
    formData.append('title', postForm.value.title);
    formData.append('content', postForm.value.content);

    // Remove mentions not present in the content
    const mentionLabels = this.mentions.map(mention => mention.label);
    const contentMentions = mentionLabels.filter(label => postForm.value.content.includes(label));
    this.mentions = this.mentions.filter(mention => contentMentions.includes(mention.label));

    for (let i = 0; i < this.mentions.length; i++) {
      formData.append('mentions', this.mentions[i].label);
    }

    for (let i = 0; i < this.files.length; i++) {
      formData.append('images', this.files[i], this.files[i].name);
    }

    this.http.post(environment.baseUrl + 'post', formData).subscribe((result) => {
      console.log(result);
    });
  }

  onFileSelected($event: Event) {
    const inputElement = $event.target as HTMLInputElement;
    const fileList = inputElement.files;

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        this.files.push(fileList[i]);
      }
      console.log(this.files);
    }
  }

  addMention($event: { label: string }) {
    console.log($event.label);
    this.mentions.push($event);
  }
}
