import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPoint } from '../interfaces/point.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  endpoint = environment.API_URL;
  route = 'points';

  constructor(private _httpClient: HttpClient) { }

  getRecords(): Observable<IPoint[]> {
    return this._httpClient.get<IPoint[]>(`${this.endpoint}/${this.route}`);
  }

  getRecordDocument(document: number): Observable<IPoint> {
    return this._httpClient.post<IPoint>(`${this.endpoint}/${this.route}/document}`, document);
  }

  createRecord(formValues: IPoint): Observable<IPoint> {
    return this._httpClient.post<IPoint>(`${this.endpoint}/${this.route}/add`, formValues);
  }
}
