import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
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
})
export class ForumPageComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private categoryService: CategoryService
  ) {}

  @ViewChild("myPostsButton") myPostsButton!: ElementRef;

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

  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["myPosts"]) {
        setTimeout(() => {
          this.myPostsButton.nativeElement.click();
        });
      }
    });

    this.showCategory();
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
    console.log("All posts");
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
    console.log("ShowMyPosts() User email : " + this.questionUserEmail);
  }
  getMyPosts() {
    console.log("getMyPosts : " + this.questionMyPostsList);
    this.questionSubscription = this.questionService
      .getQuestionsByUserEmail(this.questionUserEmail)
      .subscribe((questionsMy:Question[]) => {
        this.questionMyPostsList = questionsMy;
      });
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
        this.questionList = questions5;
      });
  }

  getQuestions() {
    this.questionSubscription = this.questionService
      .getQuestions()
      .subscribe((questions: Question[]) => {
        console.log("Questions:", questions);
        this.questionList = questions;
        console.log("questionList(forum.ts) "+ questions);
        this.loadVisibleQuestions();
        console.log("visibleQuestions(forum.ts) " + questions);
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
    this.router.navigate(["/create"]);
  }
  nav_after_publish() {
    this.router.navigate(["forum"], { queryParams: { myPosts: true } });
  }
  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
    this.questionSubscription?.unsubscribe();
  }
}
