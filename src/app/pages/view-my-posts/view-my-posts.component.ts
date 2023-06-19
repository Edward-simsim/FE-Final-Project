import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-view-my-posts',
  templateUrl: './view-my-posts.component.html',
  styleUrls: ['./view-my-posts.component.css']
})
export class ViewMyPostsComponent implements OnInit, OnDestroy {

  questionUserEmail: string="test1@gmail.com";
  question: Question[] =[];
  questionSubscription?: Subscription;
  questionList:Question[] = [];

  constructor(private route : ActivatedRoute, private questionService :QuestionService) {}

  ngOnInit(): void {
    this.questionSubscription = this.questionService.getQuestionsByUserEmail(this.questionUserEmail).subscribe((questions) => {
      this.questionList = questions;
    });
  }
  
  ngOnDestroy(): void {
    this.questionSubscription?.unsubscribe();
  }
}
