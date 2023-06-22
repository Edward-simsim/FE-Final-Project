import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { QuestionService } from 'src/app/service/question/question.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  @Input() category:Category =  new Category();
}
