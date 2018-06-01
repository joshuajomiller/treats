import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewPostComponent} from '../new-post/new-post.component';
import {DashboardService} from './dashboard.service';
import {Board} from './board.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public boards: Board[];

  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getBoards()
      .subscribe(boards => {
        this.boards = boards;
      });
  }

  openNewModal() {
    const modalRef = this.modalService.open(NewPostComponent);
    modalRef.componentInstance.name = 'NewPost';
  }
}
