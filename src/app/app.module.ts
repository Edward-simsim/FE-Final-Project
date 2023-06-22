import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { MatSelectModule } from '@angular/material/select';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
  ],
  
  providers: [
    QuestionService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('YOUR_CLIENT_ID')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  exports: [QuestionComponent]
})
export class AppModule { }
