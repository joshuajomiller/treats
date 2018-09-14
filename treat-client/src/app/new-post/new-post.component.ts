import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  @Output() action = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  public postContent: string;

  ngOnInit() {
  }

  selectNewPostType(type) {
    this.action.emit(type);
    this.activeModal.close();
  }

}
