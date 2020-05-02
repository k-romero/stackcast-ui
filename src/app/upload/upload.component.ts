import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {DAOUser} from '../signup/signup.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  videoName = '';
  progress = 0;
  errorMessage = '';

  userModel: DAOUser = undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUserDetails(sessionStorage.getItem('username')).subscribe(
      data => {
        this.userModel = data;
      }
    );
  }

  onFileSelected(event) {
    this.selectedFiles = event.target.files;
    console.log(event);
  }

  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.apiService.upload(this.videoName, this.userModel.id, this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.errorMessage = event.body.message;
          this.progress = 0;
        }
      },
      err => {
        this.progress = 0;
        this.errorMessage = 'Could not upload the file!';
        this.currentFile = undefined;
      }
    );
    this.progress = 0;
  }
}

