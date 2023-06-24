import { Comment } from "src/app/models/ comment";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Question } from "src/app/models/question";
import { CommentService } from "src/app/service/comment/comment.service";
import { QuestionService } from "src/app/service/question/question.service";
import { ElementRef, Renderer2, ViewChild, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-complete-question",
  templateUrl: "./complete-question.component.html",
  styleUrls: ["./complete-question.component.css"],
})
export class CompleteQuestionComponent implements OnInit, AfterViewInit {
  @ViewChild("comment") comment!: ElementRef;
  @Input() completeQuestion: Question = new Question();
  @Input() questionId: number = 0;
  questionSubscription: Subscription = new Subscription();
  commentSubscription: Subscription = new Subscription();
  commentList: Comment[] = [];
  commentForm!: FormGroup;
  createForm() {
    this.commentForm = this.formBuilder.group({
      text: [""],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private commentService: CommentService,
    private router: Router,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getComments();
    
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.comment.nativeElement, "input", (event) => {
      this.adjustHeight(event.target);
    });
  }

  adjustHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  getComments() {
    console.log("completeQ commnets: " + this.questionId);
    this.commentSubscription = this.commentService
      .getCommentsByQuestionId(this.questionId)
      .subscribe((comments: Comment[]) => {
        this.commentList = comments;
      });
  }
  addComment() {
   console.log("ADD comment triger");
    const comment: Comment = {
      text: this.commentForm.value.text || "",
      questionId: this.questionId,
    };
    const commentText: string = this.commentForm.value.text.trim();
    if (commentText.length < 10) {
    alert("Please enter at least 10 characters for the comment.");
    return;
  }
    this.commentService.addComment(
      comment,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlckVtYWlsIjoidGVzdDFAZ21haWwiLCJpYXQiOjE1MTYyMzkwMjJ9.SF7Bd3OplKPzRm9-Caw-LK4HFA95PTqF0AeYx_mZOOI"
    ).subscribe(()=>{
      console.log("Comment added!");
    },
    (error) =>{
      console.log("Error adding comment",error);
    }
    );
    console.log("Press addComment : " + comment.text+"  " +comment.questionId);
    this.commentForm.reset();
    this.getComments();
 

  }
}
