import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
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
  public currentBoard: string;
  public pageLoaded = false;
  private modalOption: NgbModalOptions = {};

  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService) {
    this.modalOption.backdrop = 'static';
    this.modalOption.centered = true;
    this.modalOption.size = 'lg';
  }

  ngOnInit() {
    this.refreshPage(false);
  }

  refreshPage(selectedBoardId) {
    this.pageLoaded = false;
    this.getAllBoards()
      .then((boards) => {
        this.boards = boards || [];
        let boardIndex = -1;
        if (selectedBoardId) {
          this.boards.forEach((board, index) => {
            if (board._id === selectedBoardId) {
              boardIndex = index;
            }
          });
        }
        this.selectBoard(boardIndex);
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

  selectBoard(index) {
    this.currentBoard = ( index !== -1 ? index : this.currentBoard ? this.currentBoard : 0);
  }

  newBoard() {
    const modalRef = this.modalService.open(NewBoardComponent, this.modalOption);
    modalRef.componentInstance.name = 'NewBoard';
    modalRef.componentInstance.action.subscribe(boardName => {
      this.dashboardService.newBoard(boardName)
        .subscribe(response => {
          this.refreshPage(response._id);
        });
    });
  }

  newPost(post) {
    const modalRef = this.modalService.open(NewPostComponent, this.modalOption);
    post = post || { post_type: 'TextPost', text: '' };
    modalRef.componentInstance.post = post;
    // modalRef.componentInstance.action.subscribe(action => {
    //   if (action.action === 'save') {
    //     this.savePost(action.post);
    //   }
    // });
    modalRef.result.then((newPost) => {
      this.savePost(newPost);
    }, (reason) => {});
  }

  savePost(post) {
    if (!post._id) {
      this.dashboardService.newPost(this.boards[this.currentBoard]._id, post)
        .subscribe(response => {
          this.refreshPage(false);
        });
    } else {
      this.dashboardService.editPost(this.boards[this.currentBoard]._id, post._id, post)
        .subscribe(response => {
          this.refreshPage(false);
        });
    }
  }

  deletePost(post: Post) {
    this.dashboardService.deletePost(this.boards[this.currentBoard]._id, post._id)
      .subscribe(response => {
        this.boards[this.currentBoard].posts = this.boards[this.currentBoard].posts.filter((cPost: Post) => {
          return cPost._id !== post._id;
        });
      });
  }
}
