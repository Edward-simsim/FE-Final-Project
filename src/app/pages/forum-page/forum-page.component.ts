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
export class ForumPageComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private questionService: QuestionService) {}

  questionSubscription: Subscription = new Subscription();
  questionList: Question[] = [];
  visibleQuestions: Question[] = [];
  questionsPerPage = 5;
  currentPage = 1;

  ngOnInit(): void {
    console.log("forum-page init");
    this.getQuestions();
  }

  getQuestions() {
    console.log("forum-page get questions()");
    this.questionSubscription = this.questionService
      .getQuestions()
      .subscribe((questions: Question[]) => {
        this.questionList = questions;
        this.loadVisibleQuestions();
      });
  }

  loadVisibleQuestions() {
    const startIndex = 0;
    const endIndex = this.currentPage * this.questionsPerPage;
    this.visibleQuestions = this.questionList.slice(startIndex, endIndex);
  }

  loadMoreQuestions() {
    this.currentPage++;
    this.loadVisibleQuestions();
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
