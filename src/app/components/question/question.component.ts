import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Question } from "src/app/models/question";
import { QuestionService } from "src/app/service/question/question.service";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent {
  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  @Input() question: Question = new Question();
 

  truncateText(text: string, maxRows: number, maxCharacters: number): string {
    if (!text) {
        return '';  // Return an empty string if text is undefined
    }

    const lines = text.split("\n");
    let truncatedText = "";

    for (let i = 0; i < maxRows && i < lines.length; i++) {
      const line = lines[i];

      if (line.length > maxCharacters) {
        truncatedText += line.substring(0, maxCharacters) + "...";
      } else {
        truncatedText += line;
      }

      if (i < maxRows - 1) {
        truncatedText += "\n";
      }
    }

    return truncatedText;
}
  navclick() {
    console.log("nav_click question.id : "+this.question.id );
    this.router.navigateByUrl(`/question/${this.question.id}`)
  }
}
