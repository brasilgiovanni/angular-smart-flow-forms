import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpProtocolService {

  constructor(private http: HttpClient) {}

  listUFs(): Observable<any[]> {
    return this.http.get<any[]>('api/ufs');
  }

  listMunicipios(uf: string): Observable<any[]> {
    return this.http.get<any[]>(`api/municipios?uf=${uf}`);
  }

  validateCPF(cpf: string): Observable<boolean> {
    return this.http.get<boolean>(`api/validate-cpf?cpf=${cpf}`);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post('api/register', userData);
  }

}
