import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Question } from "../../models/question";
import { map, tap } from "rxjs/operators";
import { LoginService } from "src/app/login/login.service";
export interface Speech2TextResponseDTO {
  transcript: string;
}
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
    return this.http.get<Question[]>("https://skills-overflow.ew.r.appspot.com/api/v1/questions/all").pipe(
      map((questions: Question[]) => questions.reverse())
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
      .get<Question[]>(`https://skills-overflow.ew.r.appspot.com/api/v1/questions/email`, httpOptions)
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
  uploadAudioFile(file: File) {
    console.log("Type of file: " + file.type);
    const formData = new FormData();
    formData.append('file', file, 'recorded_audio.flac');
    
    return this.http.post<Speech2TextResponseDTO>('https://skills-overflow.ew.r.appspot.com/api/v1/speech2text', formData);
  }
}
