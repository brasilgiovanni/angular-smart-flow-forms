import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockHttpProtocolService {

  private ufs: string[] = ['RS', 'SP', 'MG'];

  private municipiosMap: Record<string, string[]> = {
    'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas'],
    'SP': ['São Paulo', 'Campinas', 'Santos'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem']
  };

  // Lista de CPFs já cadastrados (mock)
  private cpfsCadastrados: string[] = [
    '123.456.789-00',
    '987.654.321-00'
  ];

  constructor() {}

  listUFs(): Observable<string[]> {
    return of(this.ufs).pipe(delay(500)); // simula delay
  }

  listMunicipios(uf: string): Observable<string[]> {
    const municipios = this.municipiosMap[uf] || [];
    return of(municipios).pipe(delay(500)); // simula delay
  }

  validateCPF(cpf: string): Observable<boolean> {
    return of(cpf).pipe(
      delay(500),
      map(value => !this.cpfsCadastrados.includes(value)) // true se CPF for válido (não cadastrado)
    );
  }

}
