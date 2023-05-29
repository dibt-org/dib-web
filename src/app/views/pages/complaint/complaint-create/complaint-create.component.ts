import {Component} from "@angular/core";

@Component({
  selector: 'app-complaint-create',
  templateUrl: './complaint-create.component.html',
  styleUrls: ['./complaint-create.component.scss']
})
export class ComplaintCreateComponent {



  newComplaint = {
    title: '',
    content: '',
    files: []
  }

  addComplaint(newComplaint: { files: any[]; title: string; content: string }) {
    console.log(this.newComplaint);
    }


}
