import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-text-post',
  templateUrl: './text-post.component.html',
  styleUrls: ['./text-post.component.scss']
})
export class TextPostComponent implements OnInit {

  @Input() text: string;
  @Output() postChanged = new EventEmitter();

  public postDetails = {
    post_type: 'TextPost',
    title: '',
    tags: [],
    text: ''
  };

  public displayMode: boolean = false;

  constructor() {
    this.postDetails.text = '';
  }

  ngOnInit() {
    if (this.text){
      this.postDetails.text = this.text;
      this.displayMode = true;
    }
  }

  postChange() {
    this.postChanged.emit(this.postDetails);
  }

}
