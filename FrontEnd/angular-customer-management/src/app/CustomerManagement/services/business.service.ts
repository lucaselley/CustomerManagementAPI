import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError } from 'rxjs';
import { Business } from '../models/business.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  businesses$ = Observable<Business[]>;

  business: Business[] = [];

  url = `${environment.api.businessUrl}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private client: HttpClient) { }



  getAll(): Observable<Business[]> {
    console.log(this.url);
    return this.client.get<Business[]>(this.url);
  }

  getById(id: string): Observable<Business> {
    return this.client.get<Business>(`${this.url}/${id}`);
  }

  delete(id: string): Observable<Business> {
    return this.client.delete(`${this.url}/${id}`);
  }

  add(business: Business): Observable<Business> {
    return this.client.post<Business>(this.url, business, this.httpOptions);
  }

  update(business: Business): Observable<Business> {
    return this.client.put<Business>(`${this.url}/${business.id}`, business, this.httpOptions);
  }

}
