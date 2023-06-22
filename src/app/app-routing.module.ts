import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { ViewQuestionPageComponent } from './pages/view-question-page/view-question-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'error', component: ErrorComponent},
  {path:"forum", component:ForumPageComponent},
  {path:"create", component: CreatePageComponent},
  {path:"question/:id", component:ViewQuestionPageComponent},
  {path:"home", component:HomePageComponent},
  {path:"about", component:AboutPageComponent},
  {path:"members", component:MembersPageComponent},
 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
