import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCategoria } from '../interfaces/categoria.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl: string = `${environment.local}/categoria`

  constructor(private http: HttpClient) { }

  solicitarCategoria(): Observable<RespuestaCategoria>{
    const url: string = `${this.apiUrl}/obtener-categoria`;
    const headers = new HttpHeaders().append('token', localStorage.getItem('token') ?? '');

    return this.http.get<RespuestaCategoria>(url, {headers});
  }
}
