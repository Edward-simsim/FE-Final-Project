import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { LoginService } from "src/app/login/login.service";
import { Comment } from "src/app/models/ comment";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private token: String = "";

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.loginService.getToken().subscribe((token) => {
      this.token = token;
    });
  }

  getCommentsByQuestionId(questionId: number): Observable<Comment[]> {
    console.log("service Commen " + questionId);
    return this.http.get<Comment[]>(
      `http://localhost:8080/api/v1/comments/questionId?questionId=${questionId}`
    );
  }

  addComment(comment: Comment): Observable<Comment> {
    console.log("service addComment "+ this.token);
 
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    };

    return this.http.post<Comment>(
      "http://localhost:8080/api/v1/comments",
      comment,
      httpOptions
    );
  }

  markCommentAsSolved(commentId: number, token: string): Observable<any> {
    const url = `http://localhost:8080/api/v1/comments/${commentId}/solved`;
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const options = { headers: headers };

    return this.http.put(url, {}, options);
  }
  markQuestionAsSolved(questionId: number, token: string): Observable<any> {
    const url = `http://localhost:8080/api/v1/comments/${questionId}/solved`;

    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const options = { headers: headers };

    return this.http.put(url, {}, options);
  }
}
