import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionService } from './service/question/question.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ViewQuestionPageComponent } from './pages/view-question-page/view-question-page.component';
import { CompleteQuestionComponent } from './components/complete-question/complete-question.component';
import { CategoryComponent } from './components/category/category.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { CommentComponent } from './components/comment/comment.component';
import { GoogleLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { MatSelectModule } from '@angular/material/select';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPageComponent } from './pages/search-page/search-page.component';


@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    ErrorComponent,
    HomePageComponent,
    ForumPageComponent,
    CreatePageComponent,
    QuestionComponent,
    ViewQuestionPageComponent,
    CompleteQuestionComponent,
    CategoryComponent,
    AboutPageComponent,
    MembersPageComponent,
    CommentComponent,
    SearchPageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatSelectModule,
    BrowserModule,
    SocialLoginModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    GoogleSigninButtonModule
  ],
  
  providers: [
    QuestionService,
   
  ],
  bootstrap: [AppComponent],
  exports: [QuestionComponent]
})
export class AppModule { }
