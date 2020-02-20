import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8081/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, params })
      .toPromise()
      .then(response => {
        const pessoas = response['content']
        const resultado = {
          pessoas,
          total: response['totalElements']
        };
        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.get(`${this.pessoasUrl}`, { headers })
      .toPromise()
      .then(response => {
        const resultado = response['content']
        return  resultado;
      });
  }

    excluir(codigo: number): Promise<void> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
    }

    mudarStatus(codigo: number, ativo: boolean): Promise<void> {

      let headers = new HttpHeaders();

      headers = headers.set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      headers = headers.set('Content-Type', 'application/json');

      return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
        .toPromise()
        .then(() => null);
    }

}
