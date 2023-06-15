import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { Question } from "src/app/models/question";
import { QuestionService } from "src/app/service/question.service";

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit, OnDestroy{

  constructor(private router: Router, private questionService:QuestionService) {}

  questionSubscription: Subscription= new Subscription();
  questionList: Question[] = [];

  ngOnInit(): void {
    console.log("forum-page init");
    this.getQuestions();
  }

  getQuestions() {
    console.log("forum-page get quesions()");
    this.questionSubscription = this.questionService
    .getQuestions()
    .subscribe((questions:Question[]) => {
      this.questionList=questions;
    })
  }



  test() {
    console.log("merge");
  }
  nav_to_create() {
    this.router.navigate(['/create']);
  }
  ngOnDestroy(): void {
    this.questionSubscription.unsubscribe();
  }
}
