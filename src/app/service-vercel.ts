import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Question } from "../../models/question";
import { map, tap } from "rxjs/operators";
import { LoginService } from "src/app/login/login.service";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  private token: String = "";

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.loginService.getToken().subscribe((token) => {
      this.token = token;
    });
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(
      "https://skills-overflow.ew.r.appspot.com/api/v1/questions/all"
    );
  }
  get5Questions(n: number): Observable<Question[]> {
    return this.http.get<Question[]>(
      `https://skills-overflow.ew.r.appspot.com/api/v1/questions/size?n=${n}`
    );
  }

  addQuestion(question: Question): Observable<Question> {
    console.log("ADDQuestion!!start");
   
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    };

    return this.http.post<Question>(
      "https://skills-overflow.ew.r.appspot.com/api/v1/questions",
      question,
      httpOptions
    );
  }

  getQuestion(id: number): Observable<Question> {
    console.log("Service question ID: " + id);
    return this.http
      .get<Question>(
        `https://skills-overflow.ew.r.appspot.com/api/v1/questions/questionId?questionId=${id}`
      )
      .pipe(
        tap((question: Question) => {
          console.log("Service question: ", question);
        })
      );
  }

  getQuestionsByUserEmail(): Observable<Question[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    };

    return this.http
      .get<Question[]>(`http://localhost:8080/api/v1/questions/email`, httpOptions)
      .pipe(map((questions) => questions.reverse()));
  }
  
  markQuestionAsSolved(questionId: number, token: string): Observable<any> {
    const url = `https://skills-overflow.ew.r.appspot.com/api/v1/questions/${questionId}/solved`;

    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const options = { headers: headers };

    return this.http.put(url, {}, options);
  }
  searchBy(
    keyword: string,
    categoryIds: number[],
    token: string
  ): Observable<Question[]> {
    console.log(categoryIds);

    const params = new HttpParams()
      .set("keyword", keyword)
      .set("categoryIds", categoryIds.join(","));

    const headers = new HttpHeaders().set("jwt", token);

    return this.http.get<any>(
      "https://skills-overflow.ew.r.appspot.com/api/v1/questions/searchBy",
      { params, headers }
    );
  }
}




// COMENTS  !!!!!!!!!!!!!!!!!!!!!!!!!!!

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
      `https://skills-overflow.ew.r.appspot.com/api/v1/comments/questionId?questionId=${questionId}`
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
      "https://skills-overflow.ew.r.appspot.com/api/v1/comments",
      comment,
      httpOptions
    );
  }

  markCommentAsSolved(commentId: number, token: string): Observable<any> {
    const url = `${BASE_URL}comments/${commentId}/solved`;
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const options = { headers: headers };

    return this.http.put(url, {}, options);
  }
  markQuestionAsSolved(questionId: number, token: string): Observable<any> {
    const url = `https://skills-overflow.ew.r.appspot.com/api/v1/comments/${questionId}/solved`;

    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const options = { headers: headers };

    return this.http.put(url, {}, options);
  }
}


// CATEGORY !!!!!!!!!!!!!!!!!!!!!!
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { BASE_URL } from "src/service-local";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategorys(): Observable<Category[]> {
    console.log("service");
    return this.http.get<Category[]>('https://skills-overflow.ew.r.appspot.com/api/v1/categories')

  }
  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`https://skills-overflow.ew.r.appspot.com/id?categoryId=${categoryId}`);
  }
  
}
