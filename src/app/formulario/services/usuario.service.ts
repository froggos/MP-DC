import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaEstadoUsuario, RespuestaUsuario } from '../interfaces/usuarios.interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl: string = `${environment.local}/usuario`;

  constructor(private http: HttpClient) { }

  solicitarUsuarios(): Observable<RespuestaUsuario>{
    const url: string = `${this.apiUrl}/listar`;
    const headers = new HttpHeaders().append('token', localStorage.getItem('token') ?? '');

    return this.http.get<RespuestaUsuario>(url, {headers});

  }

  registrarUsuario(payload: any): Observable<{ok: boolean, mensaje: string, id: number}>{
    const url: string = `${this.apiUrl}/registrar`;
    const headers = new HttpHeaders().append('token', localStorage.getItem('token') ?? '');

    return this.http.post<{ok: boolean, mensaje: string, id:number}>(url, payload, {headers});
  }

  actualizarUsuario(payload: any, id_usuario: number): Observable<{ok: boolean, mensaje: string}>{
    const url: string = `${this.apiUrl}/actualizar/${id_usuario}`;
    const headers = new HttpHeaders().append('token', localStorage.getItem('token') ?? '');

    return this.http.patch<{ok: boolean, mensaje: string}>(url, payload,{headers})
  }

  solicitarEstadoUsuario(): Observable<RespuestaEstadoUsuario>{
    const url: string = `${this.apiUrl}/solicitar-estado`;
    const headers = new HttpHeaders().append('token', localStorage.getItem('token') ?? '');

    return this.http.get<RespuestaEstadoUsuario>(url, {headers});
  }


}
