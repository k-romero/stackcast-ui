import {Video} from './video';

export class Comment {
  commentId: number;
  username: string;
  dateCreated: Date;
  userId: number;
  message: string;
  video: Video;
}
