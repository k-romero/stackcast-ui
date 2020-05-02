import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {Video} from '../videos/model/video';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userModel: DAOUser = {
    id: 0,
    userName: '',
    password: '',
    dateCreated: '',
    isConnected: true,
    userVideos: []
  };

  modalRef: BsModalRef;
  config = {
    class: 'modal-dialog-centered modal-sm',

  };

  constructor(private router: Router,
              private apiService: ApiService,
              private authService: AuthenticationService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  createUser(template: TemplateRef<any>){
    console.log(this.userModel);
    this.apiService.createUser(this.userModel).subscribe(
      res => {
        this.openModal(template);
      },
      err => {
        alert('Error creating user. Please try entering your information again.');
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
    this.router.navigate(['/login']);
  }
}

export class DAOUser {
  id: number;
  userName: string;
  password: string;
  dateCreated: string;
  isConnected: boolean;
  userVideos: Video[];
}
