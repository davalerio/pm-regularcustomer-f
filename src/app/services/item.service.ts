import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IItem } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  endpoint = environment.API_URL;
  route = 'items';

  constructor(private _httpClient: HttpClient) { }

  getRecords(): Observable<IItem[]> {
    return this._httpClient.get<IItem[]>(`${this.endpoint}/${this.route}`);
  }

  getRecord(id: string): Observable<IItem> {
    return this._httpClient.get<IItem>(`${this.endpoint}/${this.route}/${id}`);
  }

  createRecord(formValues: IItem): Observable<IItem> {
    return this._httpClient.post<IItem>(`${this.endpoint}/${this.route}`, formValues);
  }

  updateRecord(id: string, formValues: IItem): Observable<IItem> {
    return this._httpClient.put<IItem>(`${this.endpoint}/${this.route}/${id}`, formValues);
  }

  deleteRecord(id: string): Observable<IItem> {
    return this._httpClient.delete<IItem>(`${this.endpoint}/${this.route}/${id}`);
  }
}
