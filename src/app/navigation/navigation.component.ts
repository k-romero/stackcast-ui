import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public loginService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
