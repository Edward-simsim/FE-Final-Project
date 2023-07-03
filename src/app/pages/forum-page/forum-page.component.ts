import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Category } from "src/app/models/category";
import { Question } from "src/app/models/question";
import { CategoryService } from "src/app/service/category/category.service";
import { QuestionService } from "src/app/service/question/question.service";

@Component({
  selector: "app-forum-page",
  templateUrl: "./forum-page.component.html",
  styleUrls: ["./forum-page.component.css"],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ForumPageComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private categoryService: CategoryService
  ) {}

  @ViewChild("myPostsButton") myPostsButton!: ElementRef;

  selectedSearchCategories: number[] = [];
  searchForm!: FormGroup;
  categoryIds = [
    { value: 1, viewValue: "Frontend" },
    { value: 2, viewValue: "Backend" },
    { value: 3, viewValue: "HR" },
  ];

  isCategory = false;
  isAllPosts = false;
  isMyPosts = false;

  categorySubscription: Subscription = new Subscription();
  categoryList: Category[] = [];

  questionSubscription: Subscription = new Subscription();
  questionMyPostsList: Question[] = [];
  questionList: Question[] = [];
  visibleQuestions: Question[] = [];
  questionsPerPage = 5;
  currentPage = 1;
  n = 5;
  questionUserEmail: string = "test1@gmail";
  activeButtonId: string = "";


  getCategoryNamesByIds(categoryIds: number[]): string[] {
    return categoryIds.map(categoryId => {
        const category = this.categoryIds.find(cat => cat.value === categoryId);
        return category ? category.viewValue : '';
    });
}

  
  ngOnInit(): void {
    
    this.createSearchForm();
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["myPosts"]) {
        setTimeout(() => {
          this.myPostsButton.nativeElement.click();
          this.showMyPosts();
        });
      }
    });
    const categorySearchControl = this.searchForm.get("category");
    if (categorySearchControl) {
      categorySearchControl.valueChanges.subscribe((val) => {
        this.selectedSearchCategories = val.map(Number);
      });
    }
    console.log("createSearchForm : ");
    this.showCategory();
  }
 
  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      categoryIds: [[]],
      keyword: [""],
    });
  }

  showCategory() {
    this.activeButtonId = "categories";
    console.log("Category");
    this.isAllPosts = false;
    this.isCategory = true;
    this.isMyPosts = false;
    this.visibleQuestions = [];
    this.questionList = [];
    this.getCategory();
    this.get5Questions(this.n);
  }
  showAllPosts() {
    this.activeButtonId = "allPosts";
    this.isAllPosts = true;
    this.isCategory = false;
    this.isMyPosts = false;
    this.visibleQuestions = [];
    this.questionList = [];
    this.categoryList = [];
    this.getQuestions();
  }
  showMyPosts() {
    this.activeButtonId = "myPosts";
    this.isAllPosts = false;
    this.isCategory = false;
    this.isMyPosts = true;
    this.visibleQuestions = [];
    this.questionList = [];
    this.categoryList = [];
    this.getMyPosts();
  }

  getCategory() {
    this.categorySubscription = this.categoryService
      .getCategorys()
      .subscribe((categorys: Category[]) => {
        this.categoryList = categorys;
      });
  }
  get5Questions(n: number) {
    this.questionSubscription = this.questionService
      .get5Questions(n)
      .subscribe((questions5: Question[]) => {
        this.questionList = questions5.map(question => {
          return {
            ...question ,
          categoryName:this.getCategoryNamesByIds(question.categoryIds)
          }
        });
      });
  }
  getMyPosts() {
    console.log("getMyPosts : " + this.questionMyPostsList);
    this.questionSubscription = this.questionService
      .getQuestionsByUserEmail()
      .subscribe((questionsMy: Question[]) => {
        this.questionMyPostsList = questionsMy.map(question => {
          return {
            ...question, categoryNames: this.getCategoryNamesByIds(question.categoryIds)
          }
        });
      });
  }
  getQuestions() {
    this.questionSubscription = this.questionService
      .getQuestions()
      .subscribe((questions: Question[]) => {

        this.questionList = questions.map(question => {
          return {
            ...question,
            categoryNames: this.getCategoryNamesByIds(question.categoryIds)
          }
        });
        this.loadVisibleQuestions();
   
      });
  }

  loadVisibleQuestions() {
    const startIndex = 0;
    const endIndex = this.currentPage * this.questionsPerPage;
    this.visibleQuestions = this.questionList.slice(startIndex, endIndex);
  }

  loadMoreQuestions() {
    this.currentPage++;
    this.loadVisibleQuestions();
  }

  test() {
    console.log("merge");
  }

  nav_to_create() {
    this.router.navigate(["create"]);
  }
  nav_after_publish() {
    this.router.navigate(["forum"], { queryParams: { myPosts: true } });
  }

  nav_to_search() {
    const { keyword, categoryIds } = this.searchForm.value;
    this.router.navigate(["/search"], {
      queryParams: { keyword, categoryIds },
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.questionSubscription.unsubscribe();
  }
}
