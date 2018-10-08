import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  @Input() post;

  public editorConfig;
  public postBackup;

  constructor(public activeModal: NgbActiveModal) {
    this.editorConfig = {
      'editable': true,
      'spellcheck': true,
      'height': 'auto',
      'minHeight': '100px',
      'maxHeight': '400px',
      'width': 'auto',
      'minWidth': '75%',
      'translate': 'yes',
      'enableToolbar': true,
      'showToolbar': true,
      'placeholder': 'Add text here...',
      'imageEndPoint': '',
      'toolbar': [
        ['bold', 'italic', 'underline'],
        ['fontSize', 'color'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
        ['paragraph', 'blockquote', 'removeBlockquote', 'orderedList', 'unorderedList'],
        ['link']
      ]
    };
    this.post = {
      post_type: 'TextPost',
      text: ''
    };
  }

  ngOnInit() {
    this.postBackup = { ...this.post};
  }

  savePost() {
    this.activeModal.close(this.post);
  }

  dismiss() {
    this.post.text = this.postBackup.text;
    this.activeModal.dismiss();
  }

}
