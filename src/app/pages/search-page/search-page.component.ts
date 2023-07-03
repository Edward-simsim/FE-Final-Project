import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/service/question/question.service';

interface SearchForm {
  keyword: string;
  categoryIds: number[];
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  searchForm: SearchForm = {
    keyword: '',
    categoryIds: []
  };
  questionSubscription: Subscription = new Subscription();
  questionSearchList: Question[] = [];
  questionId:number=0;
  question: Question = new Question();
  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService
    
  ) {}
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
    this.activatedRoute.queryParams.subscribe(params => {
      const { keyword, categoryIds } = params;
      this.searchForm.keyword = keyword;
      this.searchForm.categoryIds =  categoryIds;
      console.log('Category IDs1 : ', this.searchForm.categoryIds);
      this.getSearchQuestions();
      console.log('Category IDs2 : ', this.searchForm.categoryIds);
    });
    
  }

  getSearchQuestions() {
    
    const { keyword, categoryIds } = this.searchForm;
    this.questionSubscription = this.questionService.searchBy(keyword, categoryIds,  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlckVtYWlsIjoidGVzdDFAZ21haWwiLCJpYXQiOjE1MTYyMzkwMjJ9.SF7Bd3OplKPzRm9-Caw-LK4HFA95PTqF0AeYx_mZOOI")
      .subscribe((questions: Question[]) => {
        this.questionSearchList = questions;
      });console.log(keyword,categoryIds);
  }

  nav_to_create() {
    this.router.navigate(["create"]);
  }

  ngOnDestroy(): void {
    this.questionSubscription.unsubscribe();
  }
}
