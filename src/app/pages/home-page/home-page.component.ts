import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor( private router: Router,) {};
  nav_forum() {
    console.log("navigate forum");
    this.router.navigate(["forum"])
  }
  nav_about() {
    console.log("navigate about");
    this.router.navigate(["about"])
  }
}
