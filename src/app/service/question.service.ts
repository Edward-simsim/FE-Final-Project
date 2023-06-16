import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    console.log("service");
    return this.http.get<Question[]>('http://localhost:3007/questions')
      .pipe(
        map(questions => questions.reverse())
      );
  }
  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>('http://localhost:3007/questions',question);
  }
}

