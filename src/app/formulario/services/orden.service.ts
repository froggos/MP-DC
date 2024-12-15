import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private apiUrl: string = `${environment.local}/orden`;
  private http: HttpClient = inject(HttpClient);

  public state = signal<boolean>(false);
  // public signalRegistroOrden = computed(() => this.#state());
  constructor() { }

  registrarOrden(payload: any): Observable<{ok: boolean, respuesta: any}>{
    const url: string = `${this.apiUrl}/registrar-orden`;
    const headers = new HttpHeaders().append('token', localStorage.getItem('token') ?? '');

    return this.http.post<{ok: boolean, respuesta: any}>(url, payload, {headers})
  }

  solicitarOrden(): Observable<{ok: boolean, respuesta: any}>{
    const url: string = `${this.apiUrl}/obtener-ordenes`;
    const headers = new HttpHeaders().append('token', localStorage.getItem('token') ?? '');

    return this.http.get<{ok: boolean, respuesta: any}>(url, {headers});
  }
}
