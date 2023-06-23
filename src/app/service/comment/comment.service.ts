import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Comment } from 'src/app/models/ comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

  getCommentsByQuestionId(questionId: number):Observable<Comment[]> {
    console.log("service Commen " +questionId);
    return this.http
    .get<Comment[]>(`http://localhost:8080/api/v1/comments/questionId?questionId=${questionId}`)
   
  }

  addComment(comment: Comment, token: string): Observable<Comment> {

    console.log("service addComment "+comment.text+comment.questionId );
console.log("token : "+token);
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${token}`
        })
    };

    return this.http.post<Comment>(
        "http://localhost:8080/api/v1/comments",
        comment,
        httpOptions
    );
}
}
