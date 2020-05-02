import { Component } from '@angular/core';

@Component({
  // selector allows component to be used in other components
  selector: 'app-root',
  // view
  templateUrl: './app.component.html',
  // style
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StackCast';
}
