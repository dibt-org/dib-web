import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResult } from '../../../../models/base-models/data-result';

interface PopupPosition {
  left: number;
  top: number;
}
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
  };

  selectedUsername: string | null = null;
  usernameList: string[] = [];

  constructor(private http: HttpClient) {}

  onContentChange() {
    const content = this.newComplaint.content;
    const atIndex = content.lastIndexOf('@');

    if (atIndex >= 0) {
      const query = content.substring(atIndex + 1);
      this.fetchUsernames(query);
    } else {
      this.usernameList = [];
    }
  }

  fetchUsernames(query: string) {
    // Make an API request to fetch the list of usernames based on the query
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    this.http
      .get<DataResult<string[]>>(
        `http://localhost:8080/api/v1/user/query?query=${query}`
      )
      .subscribe((response) => {
        this.usernameList = response.data;
      });
  }

  selectUsername(username: string) {
    this.selectedUsername = username;
    this.newComplaint.content = this.replaceLastUsername(this.newComplaint.content, username);
  }

  replaceLastUsername(content: string, username: string): string {
    const atIndex = content.lastIndexOf('@');
    if (atIndex >= 0) {
      const prefix = content.substring(0, atIndex + 1);
      return prefix + username;
    }
    return content;
  }

  addComplaint(newComplaint: { files: any[]; title: string; content: string }) {
    console.log(this.newComplaint);
  }

  textInput: string = '';
  popupVisible: boolean = false;
  popupPosition: PopupPosition = { left: 0, top: 0 };

  showPopup(event: any) {
    const target = event.target;
    const caretPosition = this.getCaretPosition(target);
    const targetRect = target.getBoundingClientRect();
    this.popupPosition.left = targetRect.left + caretPosition.left;
    this.popupPosition.top = targetRect.top + caretPosition.top + 20;
    this.popupVisible = true;
  }

  getCaretPosition(element: any): PopupPosition {
    let caretOffset = 0;
    const doc = element.ownerDocument || element.document;
    const win = doc.defaultView || doc.parentWindow;
    let sel;

    if (typeof win.getSelection !== 'undefined') {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        const range = win.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type !== 'Control') {
      const textRange = sel.createRange();
      const preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint('EndToEnd', textRange);
      caretOffset = preCaretTextRange.text.length;
    }

    let range: PopupPosition = { left: 0, top: 0 };

    if (typeof win.getSelection !== 'undefined') {
      range = this.rangeForNode(win.getSelection().anchorNode, caretOffset);
    } else if ((sel = doc.selection) && sel.type !== 'Control') {
      range = this.rangeForNode(sel.anchorNode, caretOffset);
    }

    return range;
  }

  rangeForNode(node: any, offset: number): PopupPosition {
    let range: PopupPosition = { left: 0, top: 0 };

    const rangeNode = document.createRange();
    rangeNode.setStart(node, 0);
    rangeNode.setEnd(node, offset);

    const rect = rangeNode.getBoundingClientRect();
    range.left = rect.left;
    range.top = rect.top;

    return range;
  }
}
