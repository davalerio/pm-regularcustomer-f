import { getAriaReferenceIds } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/item-categories';
   }

  getAll():Observable<ICategory[]>{
    return this.httpClient.get<ICategory[]>(this.baseUrl);
  }

  getByID(id: string): Observable<ICategory> {
    return this.httpClient.get<ICategory>(`${this.baseUrl}/${id}`);
  }

  create(formValue: any) {
    return this.httpClient.post<any>(this.baseUrl, formValue);
  }

  update(id: string, formValue: any) {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, formValue);
  }

  deleteByID(id: string) {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
