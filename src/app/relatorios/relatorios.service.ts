import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  relatorioLancamentoPorPessoa(inicio: Date, fim: Date) {
    let params = new HttpParams();
    params = params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.set('fim', moment(fim).format('YYYY-MM-DD'));
    return this.http.get(`${this.lancamentosUrl}/relatorio/por-pessoa`,
    { params, responseType: 'blob' })
    .toPromise()
    .then(response => response);
  }
}
