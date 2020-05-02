import {AfterViewInit, Component, Directive, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { Video } from './model/video';
import { Comment } from './model/comment';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  allVideos: Video[] = [];
  allComments: Comment[] = [];
  singleVideoModel: Video = undefined;

  // for video views
  videoViewFired = false;
  time = '00.00';
  totalTime = '00.00';

  singleVideo = false;
  newComment = null;
  clear: string;
  isShow = false;
  videoId = 0;

  commentModel: Comment = {
    commentId: undefined,
    username: sessionStorage.getItem('username'),
    dateCreated: undefined,
    userId: undefined,
    message: '',
    video: undefined
  };

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getAllVideos();
  }

  public getAllVideos(){
    this.apiService.getAllVideos().subscribe(
      res => {
        this.allVideos = res;
      },
      err => {
        alert('An error has occurred fetching videos!');
      });
  }

  toggleHiddenDiv() {
    this.isShow = !this.isShow;
  }

  populateSingleVideoAndShow(currVideoId: number){
    this.singleVideoModel = this.allVideos.find(value => value.videoId === currVideoId);
    this.singleVideo = !this.singleVideo;
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
        this.newComment = res;
        this.singleVideoModel.comments.push(this.newComment);
        this.clear = '';
      },
      error => {
        alert('Error saving comment!');
      }
    );
    this.clear = '';
  }

  trackTime() {
    const player = document.getElementById('singleVideo');
    player.addEventListener('timeupdate', () => {
      // @ts-ignore
      this.totalTime = player.duration.toFixed(2);
      // @ts-ignore
      this.time = player.currentTime.toFixed(2);
      if ( Number(this.time) > Number(this.totalTime) / 2){
        if (!this.videoViewFired){
          this.increment();
        }
      }
    });
  }

  addLikes(videoId: number){
    this.apiService.incrementLikes(videoId).subscribe();
    this.singleVideoModel.likes++;
  }

  addDisLikes(videoId: number){
    this.apiService.incrementDisLikes(videoId).subscribe();
    this.singleVideoModel.dislikes++;
  }

  increment(){
    if (!this.videoViewFired){
      this.videoViewFired = true;
      this.apiService.incrementViews(this.singleVideoModel.videoId).subscribe();
      this.singleVideoModel.videoViews++;
    }
  }

  resetVideoView(){
    this.videoViewFired = false;
  }

}


