import { NavigationExtras, Router } from '@angular/router';
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angular-tour-of-heroes";


  constructor(private router: Router) {}

  activePage: string = '';
  imagePath = 'assets/img/logo.jpg'
  navigate_forum() {
    this.activePage = 'forum';
    const navigationExtras: NavigationExtras = {
      replaceUrl: true
    };
  
    this.router.navigateByUrl('/', navigationExtras).then(() => {
      this.router.navigate(['forum']);
    });
  }
  navigate_home() {
    this.activePage = 'home';
      this.router.navigate(["home"]);
    
  }
  navigate_about() {
    this.activePage = 'about';
    this.router.navigate(["about"]);
  }
  navigate_members() {
    this.activePage = 'members';
    this.router.navigate(["members"]);
  }
  isRootUrl(): boolean {
    return window.location.href !== 'https://skills-overflow.vercel.app/';
  }
}
