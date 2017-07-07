import { Component ,VERSION} from '@angular/core';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    logo: string;
  header: string;

  constructor() {
    this.logo = '/assets/images/logo.gif';
    this.header = '/assets/images/header.jpg';
     console.log(VERSION.full);
  }
}
