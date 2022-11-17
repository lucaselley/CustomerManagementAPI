import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departments$ = Observable<Department[]>;
  url = `${environment.api.departmentUrl}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private client: HttpClient) { }




  getAll(): Observable<Department[]> {
    return this.client.get<Department[]>(this.url);
  }

  getById(id: string): Observable<Department> {
    return this.client.get<Department>(`${this.url}/${id}`);
  }

  delete(id: string): Observable<Department> {
    return this.client.delete<Department>(`${this.url}/${id}`);
  }

  add(department: Department): Observable<Department> {
    return this.client.post<Department>(this.url, department, this.httpOptions);
  }

  update(department: Department): Observable<Department> {
    return this.client.put<Department>(this.url, department, this.httpOptions);
  }

}
