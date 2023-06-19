import { Router } from "@angular/router";
import { Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { QuestionService } from "src/app/service/question.service";
import { Question } from "src/app/models/question";

@Component({
  selector: "app-create-page",
  templateUrl: "./create-page.component.html",
  styleUrls: ["./create-page.component.css"],
})
export class CreatePageComponent implements OnInit {
  selectedCategories: number[] = [];
  questionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private router: Router
  ) {}



  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.questionForm = this.formBuilder.group({
      userEmail: [""],
      category: this.formBuilder.array([this.formBuilder.control(false)]),
      title: [""],
      description: [""],
    });
  }

  
  updateSelectedCategories(category: number) {
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      // Category already exists, remove it
      this.selectedCategories.splice(index, 1);
    } else {
      // Category doesn't exist, add it
      this.selectedCategories.push(category);
    }
  }
  addQuestion() {
    console.log("merge?");
    const selectedCategories = this.questionForm.value.category;
    const question: Question = {
      category: this.selectedCategories,
      title: this.questionForm.value.title || "",
      description: this.questionForm.value.description || "",
      userEmail: this.questionForm.value.userEmail || "",
      date: this.questionForm.value.date || "",
    };

    this.questionService.addQuestion(question).subscribe(
      () => {
        console.log("Question added successfully");
      },
      (error) => {
        console.error("Error adding question:", error);
      }
    );
    console.log("test after publish");
   this.navigateToForum();
  }
 
  navigateToForum() {
    this.router.navigate(['forum'], { queryParams: { myPosts: true } });
  }
  
}
