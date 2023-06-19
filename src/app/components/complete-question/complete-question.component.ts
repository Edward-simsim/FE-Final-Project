import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Question } from "src/app/models/question";
import { QuestionService } from "src/app/service/question.service";
@Component({
  selector: 'app-complete-question',
  templateUrl: './complete-question.component.html',
  styleUrls: ['./complete-question.component.css']
})
export class CompleteQuestionComponent {
  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  @Input() completeQuestion: Question = new Question();


}
