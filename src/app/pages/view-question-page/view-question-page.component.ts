import { QuestionService } from 'src/app/service/question/question.service';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Question } from "src/app/models/question";

@Component({
  selector: "app-view-question-page",
  templateUrl: "./view-question-page.component.html",
  styleUrls: ["./view-question-page.component.css"],
})
export class ViewQuestionPageComponent implements OnInit,OnDestroy {
  questionId:number=0;
  question: Question = new Question();
  questionSubscription: Subscription = new Subscription();

constructor(private route : ActivatedRoute, private questionService :QuestionService) {}
categoryIds = [
  { value: 1, viewValue: "Frontend" },
  { value: 2, viewValue: "Backend" },
  { value: 3, viewValue: "HR" },
];
getCategoryNamesByIds(categoryIds: number[]): string[] {
  return categoryIds.map((categoryId) => {
    const category = this.categoryIds.find((cat) => cat.value === categoryId);
    return category ? category.viewValue : "";
  });
}
ngOnInit(): void {
  this.questionId = Number(this.route.snapshot.paramMap.get("id"));
  console.log("view questionID : " + this.questionId);

  this.questionSubscription = this.questionService.getQuestion(this.questionId).subscribe((question) => {
    this.question = {
      ...question,
      categoryNames: this.getCategoryNamesByIds(question.categoryIds)
    };
    console.log(this.question);
  });
}

refreshQuestionData() {
  this.questionSubscription = this.questionService.getQuestion(this.questionId).subscribe((question) => {
    this.question = {
      ...question,
      categoryNames: this.getCategoryNamesByIds(question.categoryIds)
    };
    console.log(this.question);
  });
}


ngOnDestroy(): void {
    this.questionSubscription.unsubscribe();
}
}

