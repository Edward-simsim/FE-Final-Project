import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Question } from "../../models/question";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http
      .get<Question[]>("http://localhost:8080/api/v1/questions/all")
      .pipe(map((questions) => questions.reverse()));
  }
  get5Questions(n:number): Observable<Question[]> {
    return this.http
      .get<Question[]>(`http://localhost:8080/api/v1/questions/size?n=${n}`)
      .pipe(map((questions) => questions.reverse().slice(0, 5)));
  }



addQuestion(question: Question, token: string): Observable<Question> {
    console.log('Question Category:', question.category);
console.log("token : "+token);
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${token}`
        })
    };

    return this.http.post<Question>(
        "http://localhost:8080/api/v1/questions",
        question,
        httpOptions
    );
}


  getQuestion(questionId: number): Observable<Question> {
    console.log("service question : " + questionId);
    return this.http.get<Question>(`http://localhost:8080/api/v1/questions/questionId?questionId=${questionId}`);
  }
  
  getQuestionsByUserEmail(email: string): Observable<Question[]> {
    console.log("getQuestionsByUserEmail : " + email);
    return this.http
      .get<Question[]>(`http://localhost:8080/api/v1/questions/email?email=${email}`)
      .pipe(map((questions) => questions.reverse()));
  }
  
}
