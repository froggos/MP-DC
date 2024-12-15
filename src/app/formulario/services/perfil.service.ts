import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaPerfil } from '../interfaces/perfil.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl: string = `${environment.local}/perfil`

  constructor(private http: HttpClient) { }

  solicitarPerfil(): Observable<RespuestaPerfil>{
    const url: string = `${this.apiUrl}/obtener-perfil`;
    const headers = new HttpHeaders().append('token', localStorage.getItem('token') ?? '');

    return this.http.get<RespuestaPerfil>(url, {headers});

  }
}
