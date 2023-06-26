import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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
  markQuestionAsSolved(questionId: number, token: string): Observable<any> {
    const url = `http://localhost:8080/api/v1/questions/${questionId}/solved`;
  

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const options = { headers: headers };
  
    return this.http.put(url, {}, options);
  }
  searchBy(keyword: string, categoryIds: number[], token: string): Observable<Question[]> {
    console.log(categoryIds);
    
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('categoryIds', categoryIds.join(','));
  
    const headers = new HttpHeaders().set('jwt', token);
  
    return this.http.get<any>('http://localhost:8080/api/v1/questions/searchBy', { params, headers });
  }
}
