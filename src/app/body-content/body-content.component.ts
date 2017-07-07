import { Component, OnInit } from '@angular/core';
import { RouterModule ,Router} from '@angular/router';
import { LoginComponent } from './../login/login.component';
@Component({
  selector: 'app-body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.css']
})
export class BodyContentComponent implements OnInit {

  constructor(public router: Router) {
  }

  
  ngOnInit() {
  
  }

}
