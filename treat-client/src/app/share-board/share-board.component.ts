import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-share-board',
  templateUrl: './share-board.component.html',
  styleUrls: ['./share-board.component.scss']
})
export class ShareBoardComponent implements OnInit {

  @Input() sharedUsers;
  @Input() emailAddress;
  @Output() action = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  addUser() {
    this.action.emit({action: 'add', email: this.emailAddress});
  }

  deleteUser(email) {
    this.action.emit({action: 'delete', email: email});
  }

  done() {
    this.activeModal.close();
  }

  resetEmailAddress() {
    this.emailAddress = '';
  }

}
