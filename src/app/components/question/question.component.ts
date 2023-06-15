
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Question } from "src/app/models/question";
import { QuestionService } from "src/app/service/question.service";
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  constructor(private questionService: QuestionService, private router:Router) {}

  @Input() question: Question= new Question();

  seeArticleDetails() {
    this.router.navigateByUrl(`/details/${this.question.id}`)
  }








}
