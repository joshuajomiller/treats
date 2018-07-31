import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-text-post',
  templateUrl: './text-post.component.html',
  styleUrls: ['./text-post.component.scss']
})
export class TextPostComponent implements OnInit {

  @Input() post;
  @Output() postSaved = new EventEmitter();

  public displayMode = true;

  constructor() {}

  ngOnInit() {
    if (!this.post.text) {
      this.displayMode = false;
    }
  }

  savePost() {
    this.postSaved.emit(this.post);
    this.displayMode = true;
  }
}
