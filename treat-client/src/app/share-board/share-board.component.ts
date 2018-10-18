import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-share-board',
  templateUrl: './share-board.component.html',
  styleUrls: ['./share-board.component.scss']
})
export class ShareBoardComponent implements OnInit {

  public emailAddress: string;

  @Output() action = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  addUser() {
    this.action.emit({email: this.emailAddress, permission: 'view'});
  }

  done() {
    this.activeModal.close();
  }

}
