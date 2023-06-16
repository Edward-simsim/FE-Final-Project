import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionService } from 'src/app/service/question.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  questionForm!: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.questionForm = this.formBuilder.group({
      category: [''],
      title: [''],
      description: ['']
    });
  }

  addQuestion() {
    console.log("merge?");
    const question: Question = {
      category: this.questionForm.value.category || "",
      title: this.questionForm.value.title || "",
      description: this.questionForm.value.description || "",
      userEmail: this.questionForm.value.userEmail || "",
      date:this.questionForm.value.date || ""
    };

    this.questionService.addQuestion(question).subscribe(
      () => {
        console.log('Question added successfully');
        // Add any additional logic or navigation after successful question creation
      },
      (error) => {
        console.error('Error adding question:', error);
        // Handle error scenarios
      }
    );
  }
}
