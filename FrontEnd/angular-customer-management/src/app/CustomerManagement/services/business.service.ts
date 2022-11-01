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
  // = Observable<Business[]>;

  constructor(private client: HttpClient) { }

  httpOptions = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });


  getAll(): Observable<Business[]> {
    const url = `${environment.api.businessApi}`;
    console.log(url);
    return this.client.get<Business[]>(url);
  }


}
