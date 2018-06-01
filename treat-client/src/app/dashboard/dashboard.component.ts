import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewPostComponent} from '../new-post/new-post.component';
import {DashboardService} from './dashboard.service';
import {Board} from './board.model';
import {NewBoardComponent} from '../new-board/new-board.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public boards: Board[];
  public pageLoaded = false;

  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllBoards()
      .then(() => {
        this.pageLoaded = true;
      });
  }

  getAllBoards() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getBoards()
        .subscribe(boards => {
          this.boards = boards;
          resolve();
        });
    });
  }

  openNewBoardModal() {
    const modalRef = this.modalService.open(NewBoardComponent);
    modalRef.componentInstance.name = 'NewBoard';
    modalRef.componentInstance.action.subscribe(boardName => {
      this.dashboardService.newBoard(boardName)
        .subscribe(response => {
          this.getAllBoards();
        });
    });
  }

  openNewPostModal() {
    const modalRef = this.modalService.open(NewPostComponent);
    modalRef.componentInstance.name = 'NewPost';
  }
}
