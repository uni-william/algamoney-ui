import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8081/categorias';

  constructor(private http: HttpClient) { }

  listarTodas() {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.get(`${this.categoriasUrl}`, { headers })
      .toPromise()
      .then(response => response );
  }
}
