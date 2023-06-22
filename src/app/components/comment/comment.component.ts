import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/ comment';
import { CommentService } from 'src/app/service/comment/comment.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  constructor(
    private commentService: CommentService,
    private router: Router
  ) {}

@Input() comment:Comment =  new Comment();


}
