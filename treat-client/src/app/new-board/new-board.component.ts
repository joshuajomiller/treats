import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {

  @Output() action = new EventEmitter();

  public boardName: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  createPost() {
    this.action.emit(this.boardName);
    this.activeModal.close();
  }
}
