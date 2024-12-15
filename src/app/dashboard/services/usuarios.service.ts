import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private _url: string = environment.local;
  private _http = inject(HttpClient);
  private _headers: HttpHeaders = new HttpHeaders({
    token: sessionStorage.getItem('token') || '',
  });

  constructor() { }

  public obtenerUsuarios = (limit: number, offset: number, param: string): Observable<any> => {
    return this._http.post<any>(`${this._url}/usuario/listar`,{
      limit, offset, param
    }, {
      headers: this._headers
    });
  }

  public obtenerCantidadTotal = () => {
    return this._http.get<any>(`${this._url}/usuario/total`);
  }
}
