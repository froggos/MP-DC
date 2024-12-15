import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ServicioService } from '../../services/servicio.service';
import { ServiciosIT } from '../../interfaces/servicios.interface';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaIt } from '../../interfaces/categoria.interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdenService } from '../../services/orden.service';
import TablaOrdenesComponent from '../../../dashboard/pages/tabla-ordenes/tabla-ordenes.component';

@Component({
  selector: 'app-orden',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './orden.component.html',
  styleUrl: './orden.component.css'
})
export default class OrdenComponent {
  private fb: FormBuilder = inject(FormBuilder)
  private tablaOrdenese: TablaOrdenesComponent = inject(TablaOrdenesComponent)
  private servicioService: ServicioService = inject(ServicioService);
  private categoriaService: CategoriaService = inject(CategoriaService);
  private ordenService: OrdenService = inject(OrdenService);

  public categoriaItem: CategoriaIt[] = [];
  public serviciosItem: ServiciosIT[] = [];
  public serviciosFiltro: ServiciosIT[] = [];

  public mostrarModal: boolean = false;
  public mostrarServicios: boolean = false;

  public formOrden: FormGroup = this.fb.group({
    servicio: [null, Validators.required],
    categoria: [null, Validators.required],
    descripcion: [null, Validators.required]
  });

  constructor(){
    this.solicitarServicios();
    this.solicitarCategoria();
  }




  mostrarModalCreacion(){
    this.mostrarModal = true;
    console.log('en el mostrar modal', this.mostrarModal);
  }

  cerrarModal(){
    this.mostrarModal = false;
    this.formOrden.reset();
  }

  obtenerValor(valor: any){
    this.mostrarServicios = false;
  }

  filtrarServicios(event: Event){
    const inputElement = event.target as HTMLInputElement;  // Convertimos el target a HTMLInputElement
    const valor = inputElement.value;
    console.log('el valor es', valor);
    console.log('datos en el supuesto filtro: ', this.serviciosItem.filter( item => item.servicio.includes(valor) ));
    if(valor != ''){
      this.serviciosItem = this.serviciosItem.filter( item => item.servicio.includes(valor) );
      console.log('valor del se4rviciositem', this.serviciosItem);
    }else{
      this.serviciosItem = this.serviciosFiltro;
      console.log('esta vacio');
    }
  }

  solicitarServicios(){
    this.servicioService.solicitarServicios().subscribe({
      next: (resp) => {
        if(resp.ok){
          this.serviciosItem = resp.respuesta;
          this.serviciosFiltro = resp.respuesta;
        }
      },
      error: (error) => {
        console.log('Respuesta del error', error);
      }
    })
  }

  solicitarCategoria(){
    this.categoriaService.solicitarCategoria().subscribe({
      next: (resp) => {
        if(resp.ok){
          this.categoriaItem = resp.respuesta;
        }
      },
      error: (error) => {
        console.log('Ocurrio un problema al solicitar la categoria', error);
      }
    })
  }


  registrarOrden(){
    const servicio = this.formOrden.get('servicio')?.value;
    const categoria = this.formOrden.get('categoria')?.value;
    const descripcion = this.formOrden.get('descripcion')?.value;

    if(this.formOrden.invalid){
      return alert("No pueden quedar campos vacios");
    }

    const payload = { id_servicio: Number(servicio), id_categoria: Number(categoria), id_usuario: 1, descripcion};
    this.ordenService.registrarOrden(payload).subscribe({
      next: (resp) => {
        if(resp.ok){
          this.tablaOrdenese.solicitarOrdenes();
          this.ordenService.state.set(true);
          this.cerrarModal();
          alert("Registrado correctamente");
        }
      },
      error: (error) => {
        this.ordenService.state.set(false);
        console.log("Error al intentar registrar la orden", error);
      }
    })

  }
}
