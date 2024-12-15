import { Injectable, signal, WritableSignal } from '@angular/core';
import { Sesion } from '../../login/interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {

  private _sesionActual: WritableSignal<Sesion | null> = signal(null);

  constructor() { }

  public set setSesion(sesion: Sesion) {
    this._sesionActual.set(sesion);
  }

  public get getSesion() {
    return this._sesionActual();
  }

  public destruirSesion = () => {
    this._sesionActual.update(() => null);
    localStorage.clear();
  }
}
