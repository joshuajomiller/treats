import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-text-post',
  templateUrl: './text-post.component.html',
  styleUrls: ['./text-post.component.scss']
})
export class TextPostComponent implements OnInit {

  @Output() postChanged = new EventEmitter();

  public postDetails = {
    post_type: 'TextPost',
    title: '',
    tags: [],
    text: ''
  };

  constructor() {
    this.postDetails.text = '';
  }

  ngOnInit() {
  }

  postChange() {
    this.postChanged.emit(this.postDetails);
  }

}
