import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaServicios } from '../interfaces/servicios.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl: string = `${environment.local}/servicios`;

  constructor(private http: HttpClient) { }

  solicitarServicios(): Observable<RespuestaServicios>{
    const url: string = `${this.apiUrl}/obtener-servicios`;
    const headers = new HttpHeaders().append('token', localStorage.getItem('token') ?? '');

    return this.http.get<RespuestaServicios>(url, {headers})
  }
}
