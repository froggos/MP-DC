import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../shared/services/login.service';
import { AuthStoreService } from '../../../shared/store/auth-store.service';
import { Router } from '@angular/router';
import { RutService } from '../../../shared/services/rut.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private _loginSrvc = inject(LoginService);
  private _fb: FormBuilder = inject(FormBuilder);
  private _sessionStore = inject(AuthStoreService);
  private _router = inject(Router);
  public rutSrvc = inject(RutService);

  public form: FormGroup = this._fb.group({
    run : ['', Validators.required],
    pass: ['', Validators.required],
  });

  public login = () => {
    if (!this.form.valid) {
      alert('Debe llenar el formulario!');
      this.form.markAllAsTouched();
      return;
    }

    this._loginSrvc.login(this.form.get('run')?.value, this.form.get('pass')?.value)
    .subscribe({
      next: (resp) => {
        console.log(resp);

        sessionStorage.setItem('token', resp.token!);

        this._sessionStore.setSesion = {
          usuario: {
            run: resp.run,
            nombres: resp.nombres,
            apellido_paterno: resp.apellido_paterno,
            apellido_materno: resp.apellido_materno,
            correo: resp.correo,
            estado: resp.estado,
            perfil: resp.perfil,
            servicio: resp.servicio,
          },
          activo: true,
        };

        this._router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Se completó al menos.');
      },
    });
  }

  formatearRun = () => {
    let run: string = this.form.get('run')!.value;
    run = this.rutSrvc.formatearRUN(run);
    this.form.get('run')?.setValue(run);
  }
}
