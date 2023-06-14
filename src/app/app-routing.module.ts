import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';

const routes: Routes = [
  {path:"", component:ForumPageComponent},
  {path:"create", component: CreatePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
