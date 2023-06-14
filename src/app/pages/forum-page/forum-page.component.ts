import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent {

  constructor(private router: Router) {}

  test() {
    console.log("merge");
  }
  nav_to_create() {
    this.router.navigate(['/create']);
  }
}
