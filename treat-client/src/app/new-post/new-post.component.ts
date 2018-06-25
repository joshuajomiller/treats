import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  @Output() action = new EventEmitter();

  public newPostType: string;
  public newPost;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  selectNewPostType(type) {
    this.newPostType = type;
  }

  onPostChange(post) {
    console.log(post);
    this.newPost = post;
  }

  closeModal() {
    this.action.emit(this.newPost);
    this.activeModal.close();
  }

}
