import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Business } from '../models/business.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  businesses$ = Observable<Business[]>;
  url = `${environment.api.businessUrl}`;
  constructor(private client: HttpClient) { }

  httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });


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
    return this.client.post<Business>(this.url, business);
  }

  update(business: Business, id: string): Observable<Business> {
    return this.client.put<Business>(`${this.url}/${id}`, business);
  }

}
