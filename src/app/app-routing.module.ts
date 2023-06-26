import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { ViewQuestionPageComponent } from './pages/view-question-page/view-question-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:"forum", component:ForumPageComponent},
  {path:"create", component: CreatePageComponent},
  {path:"question/:id", component:ViewQuestionPageComponent},
  {path:"home", component:HomePageComponent},
  {path:"about", component:AboutPageComponent},
  {path:"members", component:MembersPageComponent},
  {path:"search",component:SearchPageComponent},
 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
