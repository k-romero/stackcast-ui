import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false;


  constructor(private http: HttpClient, public loginService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  // ORIGINAL
  // checkLogin() {
  //     (this.loginService.authenticate(this.username, this.password).subscribe(
  //         data => {
  //                 this.router.navigate(['/videos']);
  //                 this.invalidLogin = false;
  //             },
  //             error => {
  //                 this.invalidLogin = true;
  //             }
  //         )
  //     );
  // }

  checkLogin() {
    (this.loginService.authenticate(this.username, this.password).subscribe(
        data => {
          this.router.navigate(['/dashboard']);
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
        }
      )
    );
  }
}



