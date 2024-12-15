import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { TablaComponent } from "../../../shared/components/tabla/tabla.component";
import { UsuariosService } from '../../services/usuarios.service';
import { LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import UsuarioComponent from '../../components/usuario/usuario.component';


@Component({
  selector: 'app-tabla-usuarios',
  imports: [
    NavbarComponent, 
    TablaComponent, 
    TitleCasePipe, 
    UpperCasePipe, 
    LowerCasePipe,
    UsuarioComponent,
  ],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.css'
})
export default class TablaUsuariosComponent {
  private _usService = inject(UsuariosService);
  
  public usuarios: any;
  public cabeceras: string[] = ['RUN', 'Nombre', 'Correo', 'Servicio', 'Rol', 'Estado'];
  public cantidad: number = 0;

  constructor() {
    this._usService.obtenerUsuarios(5, 0, '').subscribe({
      next: (value) => {
        this.usuarios = value.data;
      },
      error: (err) => {
        this.usuarios = [];
      },
    });

    this._usService.obtenerCantidadTotal().subscribe({
      next: (value) => {
        this.cantidad = value.total;
      },
      error: (err) => {
        this.cantidad = 0;
      },
    })
  }

  public obtenerPagina = (evt: any) => {
    const limit : number  = evt[1];
    const offset: number  = evt[0];
    const param : string  = evt[2];

    console.log('limit: ', limit);
    console.log('offset: ', offset);
    console.log('param: ', param.trim());

    this._usService.obtenerUsuarios(limit, offset, param.trim()).subscribe({
      next: (value) => {
        this.usuarios = value.data;
      },
      error: (err) => {
        this.usuarios = [];
      },
    });
  }

  public abrirModal = (event: any) => {
    console.log(event);
  }
}
