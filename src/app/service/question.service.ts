import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Question } from "../models/question";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http
      .get<Question[]>("http://localhost:3007/questions")
      .pipe(map((questions) => questions.reverse()));
  }
  get5Questions(): Observable<Question[]> {
    return this.http
      .get<Question[]>("http://localhost:3007/questions")
      .pipe(map((questions) => questions.reverse().slice(0, 5)));
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(
      "http://localhost:3007/questions",
      question
    );
  }

  getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(`http://localhost:3007/questions/${id}`);
  }
  // getQuestionsByUserEmail(userEmail: string): Observable<Question[]> {
  //   console.log("getQuestionsByUserEmail : "+userEmail);
  //   return this.http
  //     .get<Question[]>(`http://localhost:3007/questions?email=${userEmail}`)
  //     .pipe(map((questions) => questions.reverse()));
   
  // }
  getQuestionsByUserEmail(userEmail: string): Observable<Question[]> {
    console.log("getQuestionsByUserEmail : " + userEmail);
    return this.http
      .get<Question[]>(`http://localhost:3007/questions?userEmail=${userEmail}`)
      .pipe(map((questions) => questions.reverse()));
  }
  
}
