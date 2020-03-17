import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  inputFileChange(event): Promise<any> {
    if (event.target.files && event.target.files[0]) {
      const anexo = event.target.files[0];
      const formData = new FormData();
      formData.append('anexo', anexo);
      return this.http.post(`${this.lancamentosUrl}/anexo`, formData)
      .toPromise()
      .then(response => response);
    }
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
      .toPromise()
      .then(response => {
        const lancamentos = response['content']
        const resultado = {
          lancamentos,
          total: response['totalElements']
        }
        return resultado;
      });
    }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post<Lancamento>(
      this.lancamentosUrl, lancamento)
      .toPromise();
  }


  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
        lancamento)
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}


