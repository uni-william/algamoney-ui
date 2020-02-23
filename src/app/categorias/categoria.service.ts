import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8081/categorias';

  constructor(private http: HttpClient) { }

  listarTodas() {
    return this.http.get(`${this.categoriasUrl}`)
      .toPromise()
      .then(response => response );
  }
}