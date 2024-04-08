import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {
  endpoint = environment.API_URL;
  route = 'item-categories';

  constructor(private _httpClient: HttpClient) { }

  getRecords(): Observable<ICategory[]> {
    return this._httpClient.get<ICategory[]>(`${this.endpoint}/${this.route}`);
  }

  getRecord(id: string): Observable<ICategory> {
    return this._httpClient.get<ICategory>(`${this.endpoint}/${this.route}/${id}`);
  }

  createRecord(formValues: ICategory): Observable<ICategory> {
    return this._httpClient.post<ICategory>(`${this.endpoint}/${this.route}`, formValues);
  }

  updateRecord(id: string, formValues: ICategory): Observable<ICategory> {
    return this._httpClient.put<ICategory>(`${this.endpoint}/${this.route}/${id}`, formValues);
  }

  deleteRecord(id: string): Observable<ICategory> {
    return this._httpClient.delete<ICategory>(`${this.endpoint}/${this.route}/${id}`);
  }
}
