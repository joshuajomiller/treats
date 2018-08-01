import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewPostComponent} from '../new-post/new-post.component';
import {DashboardService} from './dashboard.service';
import {Board} from './board.model';
import {Post} from './post.model';
import {NewBoardComponent} from '../new-board/new-board.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public boards: Board[] = [];
  public currentBoard: Board;
  public pageLoaded = false;

  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    this.refreshPage(false);
  }

  refreshPage(selectedBoard) {
    this.pageLoaded = false;
    this.getAllBoards()
      .then((boards) => {
        this.boards = boards;
        this.selectBoard(selectedBoard);
        this.pageLoaded = true;
      });
  }

  getAllBoards(): Promise<Board[]> {
    return new Promise((resolve, reject) => {
      this.dashboardService.getBoards()
        .subscribe(boards => {
          resolve(boards);
        });
    });
  }

  selectBoard(board) {
    this.currentBoard = (board ? board : this.currentBoard ? this.currentBoard : this.boards[0]);
  }

  openNewBoardModal() {
    const modalRef = this.modalService.open(NewBoardComponent);
    modalRef.componentInstance.name = 'NewBoard';
    modalRef.componentInstance.action.subscribe(boardName => {
      this.dashboardService.newBoard(boardName)
        .subscribe(response => {
          this.refreshPage(response);
        });
    });
  }

  openNewPostModal() {
    const modalRef = this.modalService.open(NewPostComponent);
    modalRef.componentInstance.name = 'NewPost';
    modalRef.componentInstance.action.subscribe(type => {
      this.newEmptyPost(type);
    });
  }

  newEmptyPost(type: string) {
    this.currentBoard.posts.unshift(
      {
        post_type: type
      }
    );
  }

  savePost(post) {
    if (!post._id) {
      this.dashboardService.newPost(this.currentBoard._id, post)
        .subscribe(response => {
          this.refreshPage(false);
        });
    }
  }

  deletePost(post: Post) {
    this.dashboardService.deletePost(this.currentBoard._id, post._id)
      .subscribe(response => {
        this.currentBoard.posts = this.currentBoard.posts.filter((cPost: Post) => {
          return cPost._id !== post._id;
        });
      });
  }
}
