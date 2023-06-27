import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { QuestionService } from "src/app/service/question/question.service";
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

  categories = [
    { value: 1, viewValue: "One" },
    { value: 2, viewValue: "Two" },
    { value: 3, viewValue: "Three" },
  ];

  ngOnInit() {
    this.createForm();
    const categoryControl = this.questionForm.get("category");
    if (categoryControl) {
      categoryControl.valueChanges.subscribe((val) => {
        this.selectedCategories = val.map(Number);
      });
    }
  }

  createForm() {
    this.questionForm = this.formBuilder.group({
      categoryIds: [[]],
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

  isSolved: boolean = false;
  addQuestion() {
    console.log("merge?");
    const selectedCategories = this.questionForm.value.categoryIds;
    const question: Question = {
      categoryIds:selectedCategories || [],
      title: this.questionForm.value.title || "",
      description: this.questionForm.value.description || "",
      email: this.questionForm.value.email || "",
      creationDate: this.questionForm.value.date || "",
      solved:this.isSolved
    };
    console.log("Question Category:", question.categoryIds);
    this.questionService
      .addQuestion(
        question
      )
      .subscribe();
    console.log("test after publish");
    this.navigateToForum();
  }

  navigateToForum() {
    this.router.navigate(["forum"], { queryParams: { myPosts: true } });
  }
  onSubmit(formValue: any) {
    console.log("Selected categories:", formValue.categorySelect);
  }
}
