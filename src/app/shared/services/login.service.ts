import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _http: HttpClient = inject(HttpClient);
  private _url: string = environment.local;

  constructor() { }

  public login = (run: string, pass: string): Observable<any> => {
    return this._http.post<any>(`${this._url}/usuario/autenticar`, {
      run: run.trim(),
      clave: pass.trim(),
    });
  }

  public autenticado = (): Observable<boolean> => {
    const headers: HttpHeaders = new HttpHeaders({
      token: sessionStorage.getItem('token') || '',
    });

    return this._http.get<any>(`${this._url}/usuario/verificar-token`, {
      headers: headers
    });
  }
}
