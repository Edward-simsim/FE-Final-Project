import { QuestionService } from 'src/app/service/question.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Question } from "src/app/models/question";

@Component({
  selector: "app-view-question-page",
  templateUrl: "./view-question-page.component.html",
  styleUrls: ["./view-question-page.component.css"],
})
export class ViewQuestionPageComponent implements OnInit {
  questionId: string = "";
  question: Question = new Question();
  questionSubscription: Subscription = new Subscription();

constructor(private route : ActivatedRoute, private questionService :QuestionService) {}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get("id") ?? "";
    this.questionSubscription= this.questionService.getQuestion(this.questionId).subscribe((question) => {
      this.question=question
    })
  }
}
