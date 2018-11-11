import {Post} from './post.model';

export class Board {
  name: string;
  userId: string;
  posts: Post[];
  _id: string;
  status: string;
}
