import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Audit } from '../models/audit.model';

@Injectable({
  providedIn: 'root'
})
export class AuditsService {

  Audit$ = Observable<Audit[]>;
  url = `${environment.api.auditUrl}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private client: HttpClient) { }

  getAuditByEntityId(id: string): Observable<Audit> {
    return this.client.get<Audit>(`${this.url}/${id}`);
  }
}
