import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Question } from "../../models/question";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http
      .get<Question[]>("http://localhost:8080/api/v1/questions/all")
      
  }
  get5Questions(n:number): Observable<Question[]> {
    return this.http
      .get<Question[]>(`http://localhost:8080/api/v1/questions/size?n=${n}`)
     
  }

 

addQuestion(question: Question, token: string): Observable<Question> {
    console.log("ADDQuestion!!start");
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


getQuestion(id: number): Observable<Question> {
  console.log("Service question ID: " + id);
  return this.http.get<Question>(`http://localhost:8080/api/v1/questions/questionId?questionId=${id}`)
    .pipe(
      tap((question: Question) => {
        console.log("Service question: ", question);
      })
    );
}

  
  getQuestionsByUserEmail(email: string): Observable<Question[]> {
    console.log("getQuestionsByUserEmail : " + email);
    return this.http
      .get<Question[]>(`http://localhost:8080/api/v1/questions/email?email=${email}`)
      .pipe(map((questions) => questions.reverse()));
  }
  
}