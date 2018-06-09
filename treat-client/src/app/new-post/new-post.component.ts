import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  public postType = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  selectPostType(type){
    this.postType = type;
  }


}
