import { QuestionService } from "src/app/service/question/question.service";
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Comment } from "src/app/models/ comment";
import { Question } from "src/app/models/question";
import { CommentService } from "src/app/service/comment/comment.service";
import { Subscription } from "rxjs";


@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit,OnDestroy {
  @Input() comment: Comment = new Comment();
  @Input() question: Question = new Question();
  @Input() questionId: number = 0;
  @Output() commentMarkedTrue: EventEmitter<number> = new EventEmitter<number>();
  questionSubscription: Subscription = new Subscription();
  commentSubscription: Subscription = new Subscription();

  tokenC =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlckVtYWlsIjoidGVzdDFAZ21haWwiLCJpYXQiOjE1MTYyMzkwMjJ9.SF7Bd3OplKPzRm9-Caw-LK4HFA95PTqF0AeYx_mZOOI";
  tokenQ =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlckVtYWlsIjoidGVzdDFAZ21haWwiLCJpYXQiOjE1MTYyMzkwMjJ9.SF7Bd3OplKPzRm9-Caw-LK4HFA95PTqF0AeYx_mZOOI";
  constructor(
    private commentService: CommentService,
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    console.log("MarkTrue qustionID1 : " + this.questionId);
    console.log("On init commentId " + this.comment.commentId);
  }

  markTrue(commentId: number, token: string) {
    console.log("MarkTrue commentId: " + commentId);

    this.commentService
      .markCommentAsSolved(commentId, this.tokenC)
      .subscribe(() => {
       
          this.markQuestionTrue(this.questionId!, this.tokenC);
     
      });
      setTimeout(() => {
        this.commentMarkedTrue.emit(commentId);
      }, 500);
    
  }

  markQuestionTrue(questionId: number, token: string) {
    console.log("MarkTrue questionID2 : " + questionId);

    const tokens =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlckVtYWlsIjoidGVzdDFAZ21haWwiLCJpYXQiOjE1MTYyMzkwMjJ9.SF7Bd3OplKPzRm9-Caw-LK4HFA95PTqF0AeYx_mZOOI";

    this.questionService.markQuestionAsSolved(questionId, tokens).subscribe();
    console.log("mark question Complete");

  }
  ngOnDestroy(): void {
    this.commentSubscription.unsubscribe();
    this.questionSubscription.unsubscribe();
  }
}
