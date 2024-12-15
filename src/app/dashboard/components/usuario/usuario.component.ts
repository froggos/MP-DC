import { Component, inject } from '@angular/core';
import { ServicioService } from '../../../formulario/services/servicio.service';
import { ServiciosIT } from '../../../formulario/interfaces/servicios.interface';
import { PerfilService } from '../../../formulario/services/perfil.service';
import { PerfilIT } from '../../../formulario/interfaces/perfil.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../formulario/services/usuario.service';
import { CommonModule } from '@angular/common';
import { EstadoUsuarioIT } from '../../../formulario/interfaces/usuarios.interfaces';
import { RutService } from '../../../shared/services/rut.service';

@Component({
  selector: 'app-usuario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export default class UsuarioComponent {
  private usuarioService: UsuarioService = inject(UsuarioService);
  private perfilService: PerfilService   = inject(PerfilService);
  private fb: FormBuilder                = inject(FormBuilder);
  private _runSrvc                       = inject(RutService);
  
  public serviciosService : ServicioService   = inject(ServicioService);
  public servicioItem     : ServiciosIT[]     = [];
  public perfilItem       : PerfilIT[]        = [];
  public estadoUsuItem    : EstadoUsuarioIT[] = [];
  public id_usuario_existe: number | null     = null;


  mostrarPass  : boolean = false;
  mostrarModal : boolean = false;
  existeUsuario: boolean = false;

  formUsuario: FormGroup = this.fb.group({
    run         : [null, Validators.required],
    nombres     : [null, Validators.required],
    apellido_pat: [null, Validators.required],
    apellido_mat: [null, Validators.required],
    correo      : [null],
    servicio    : [null, Validators.required],
    perfil      : [null, Validators.required],
    estado      : [null],
    password    : [null, Validators.required],
    password2   : [null, Validators.required]

  });

  constructor() {
    this.obtenerServicios();
    this.obtenerPerfiles();
    this.obtenerEstadoUsuario();
  }

  private obtenerServicios() {
    this.serviciosService.solicitarServicios().subscribe({
      next: (resp) => {
        if(resp.ok){
          this.servicioItem = resp.respuesta
        }
      },
      error: (error) => {
        console.log('Error en solicitar servicios', error);
      }
    })
  }

  private obtenerPerfiles(){
    this.perfilService.solicitarPerfil().subscribe({
      next: (resp) => {
        if(resp.ok){
          this.perfilItem = resp.respuesta
        }
      },
      error: (error) => {
        console.log('Error en el obtener perfiles', error);
      }
    })
  }

  private obtenerEstadoUsuario(){
    console.log('Se ejecuto otener estado');
    this.usuarioService.solicitarEstadoUsuario().subscribe({
      next: (resp) => {
        console.log('en el obtener estado del usuario', resp);
        if(resp.ok){
          this.estadoUsuItem = resp.respuesta;
        }
      },
      error: (error) => {
        console.log('Error en el obtenerUsuario', error);
      }
    });
  }

  formatearRun(event: any) {
    let run = event.target.value;
    run = this._runSrvc.formatearRUN(run);
    this.formUsuario.get('run')!.setValue(run);
  }

  buscarUsuario() {
    const run = this.formUsuario.get('run')?.value;

    if (run === null) { return alert("Por favor ingrese un run") }
    
    if (!this._runSrvc.validarRun(run)) { return alert("El run es invalido"); };
    
    const valor: number = 1;
    this.existeUsuario = true;
    this.validarValidadores();

    this.formUsuario.patchValue({
      run: '18353800-4',
      nombres: 'Manolete',
      apellido_pat: 'Segovia',
      apellido_mat: 'Segovia',
      correo: 'donmanuel@gmail.com',
      servicio: valor.toString(),
      perfil: valor.toString(),
      estado: valor.toString(),
      password: '',
      password2: '',
    });

    this.formUsuario.get('run')?.disable();
    this.id_usuario_existe = 10;
  }

  registrarUsuario() {
    const run = this.formUsuario.get('run')?.value.toUppercase();
    const nombres = this.formUsuario.get('nombres')?.value.toUppercase();
    const apellido_paterno = this.formUsuario.get('apellido_pat')?.value.toUppercase();
    const apellido_materno = this.formUsuario.get('apellido_mat')?.value.toUppercase();
    const correo = this.formUsuario.get('correo')?.value.toUpperCase();
    const servicio = this.formUsuario.get('servicio')?.value;
    const perfil = this.formUsuario.get('perfil')?.value;
    const pass = this.formUsuario.get('password')?.value;
    const pass2 = this.formUsuario.get('password2')?.value;

    if(this.formUsuario.invalid){ return alert("No pueden quedar campos vacios") }

    if(!this._runSrvc.validarRun(run)) { return alert('El run es invalido'); }

    if(pass != pass2){ return alert('Las contraseñas no coinciden') }
    const payload  = { run, nombres, apellido_paterno, apellido_materno, correo, clave: pass, id_servicio: Number(servicio), id_perfil: Number(perfil)}
    this.usuarioService.registrarUsuario(payload).subscribe({
      next: (resp) => {
        console.log('Respuesta del registro ', resp);
        if (resp.ok) {
          this.cerrarModal();
          return alert("Registrado correctamente");
        }
      },
      error: (error) => {
        return alert(`Ocurrio un error en el registro: ${error.error}`);
      }
    });
  }

  validarValidadores() {
    const password = this.formUsuario.get('password');
    const password2 = this.formUsuario.get('password2');
    const estado = this.formUsuario.get('estado');

    if (this.existeUsuario) {
      estado?.setValidators(Validators.required);
      password?.clearValidators();
      password2?.clearValidators();
    } else {
      estado?.clearValidators();
      password?.setValidators(Validators.required);
      password2?.setValidators(Validators.required);
    }

    estado?.updateValueAndValidity();
    password?.updateValueAndValidity();
    password2?.updateValueAndValidity();
  }

  cerrarModal(){
    this.mostrarModal = false;
    this.formUsuario.reset();
    this.mostrarPass = false;
    this.existeUsuario = false;
    this.id_usuario_existe = null;
    this.formUsuario.get('run')?.enable();
  }

  //Para ver la contraseña u ocultarla si presionan el btn
  verPass(){
    this.mostrarPass = !this.mostrarPass;
  }
}
