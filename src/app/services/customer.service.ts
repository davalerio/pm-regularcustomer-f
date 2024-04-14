import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICustomer } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  endpoint = environment.API_URL;
  route = 'customers'

  constructor(private _httpClient: HttpClient) { }

  getRecords(): Observable<ICustomer[]> {
    return this._httpClient.get<ICustomer[]>(`${this.endpoint}/${this.route}`);
  }

  getRecord(id: string): Observable<ICustomer> {
    return this._httpClient.get<ICustomer>(`${this.endpoint}/${this.route}/${id}`);
  }

  createRecord(formValues: ICustomer): Observable<ICustomer> {
    return this._httpClient.post<ICustomer>(`${this.endpoint}/${this.route}`, formValues);
  }

  updateRecord(id: string, formValues: ICustomer): Observable<ICustomer> {
    return this._httpClient.put<ICustomer>(`${this.endpoint}/${this.route}/${id}`, formValues);
  }

  deleteRecord(id: string): Observable<ICustomer> {
    return this._httpClient.delete<ICustomer>(`${this.endpoint}/${this.route}/${id}`);
  }
}
