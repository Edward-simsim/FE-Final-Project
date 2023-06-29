import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('2s ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
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
