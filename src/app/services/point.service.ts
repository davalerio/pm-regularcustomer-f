import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPoint, IPointCustomer } from '../interfaces/point.interface';

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

  getPointsCutomers(): Observable<IPointCustomer[]> {
    return this._httpClient.get<IPointCustomer[]>(`${this.endpoint}/${this.route}/customers`);
  }

  getPointsDocument(document: number): Observable<IPoint> {
    return this._httpClient.get<IPoint>(`${this.endpoint}/${this.route}/document/${document}`);
  }

  createRecord(formValues: IPoint): Observable<IPoint> {
    return this._httpClient.post<IPoint>(`${this.endpoint}/${this.route}/add`, formValues);
  }
}
