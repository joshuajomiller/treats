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

  getBoard(id: number) {
    return this.http.get<Board>('/api/board/' + id);
  }

}
