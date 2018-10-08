import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-text-post',
  templateUrl: './text-post.component.html',
  styleUrls: ['./text-post.component.scss']
})
export class TextPostComponent implements OnInit {

  @Input() post;
  @Output() postEdit = new EventEmitter();
  @Output() postDelete = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  editPost() {
    this.postEdit.emit(this.post);
  }
  deletePost() {
    this.postDelete.emit(this.post);
  }
}
