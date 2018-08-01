import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Board} from './board.model';

@Injectable()
export class DashboardService {
  private userToken: string;

  constructor(private http: HttpClient) {
    this.userToken = localStorage.getItem('userToken');
  }

  getBoards() {
    return this.http.get<Board[]>('/api/board/');
  }

  newBoard(name) {
    return this.http.post('/api/board/', {name: name});
  }

  newPost(boardId, post) {
    return this.http.post('/api/board/' + boardId + '/post', {post: post});
  }

  deletePost(boardId, postId) {
    return this.http.delete('/api/board/' + boardId + '/post/' + postId, );
  }

  getBoard(id: number) {
    return this.http.get<Board>('/api/board/' + id);
  }

}
