import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategorys(): Observable<Category[]> {
    console.log("service");
    return this.http.get<Category[]>('http://localhost:8080/api/v1/categories')

  }
  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`http://localhost:8080/api/v1/categories/id?categoryId=${categoryId}`);
  }
  
}
