import {Component, OnInit} from '@angular/core';
import {DAOUser} from '../signup/signup.component';
import {ApiService} from '../shared/api.service';
import {Video} from '../videos/model/video';
import {Comment} from '../videos/model/comment';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // For Modal
  modalRef: BsModalRef;
  config = {
    keyboard: false
  };

  userModel: DAOUser = undefined;

  allVideos: Video[] = [];
  allComments: Comment[] = [];
  isShow = false;
  isEmpty = false;
  videoId = 0;

  commentModel: Comment = {
    commentId: undefined,
    username: sessionStorage.getItem('username'),
    dateCreated: undefined,
    userId: undefined,
    message: '',
    video: undefined
  };

  constructor(private apiService: ApiService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.apiService.getUserDetails(sessionStorage.getItem('username')).subscribe(
      data => {
        this.userModel = data;
        this.getAllUserVideos();
      }
    );
  }

  public getAllUserVideos(){
    this.apiService.getAllUserVideos(this.userModel.id).subscribe(
      res => {
        this.allVideos = res;
        this.toggleHiddenImage();
      },
      err => {
        alert('An error has occurred fetching videos!');
      });
  }

  toggleHiddenDiv() {
    this.isShow = !this.isShow;
  }

  toggleHiddenImage() {
    if (this.allVideos.length === 0){
      this.isEmpty = true;
    }
  }

  onVideoSelect(id: number) {
    this.videoId = id;
    this.apiService.getAllCommentsFromVideo(this.videoId).subscribe(
      res => {
        this.allComments = res;
      },
      err => {
        alert('An error has occurred fetching comments!');
      });
  }

  public addCommentToVideo(videoId: number, ){
    this.apiService.addCommentToVideo(videoId, this.commentModel).subscribe(
      res => {
        this.allVideos.find(value => value.videoId === videoId).comments.push(res);
      },
      error => {
        alert('Error saving comment!');
      }
    );
  }



  public deleteVideo(id: number){
    this.apiService.delete(id).subscribe(
      res => {
        console.log('video with id=' + id + 'deleted');
      }
    );
  }
}
