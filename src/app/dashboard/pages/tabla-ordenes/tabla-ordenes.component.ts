import { Component, inject } from '@angular/core';
import OrdenComponent from '../../../formulario/pages/orden/orden.component';
import { OrdenService } from '../../../formulario/services/orden.service';
import { CommonModule } from '@angular/common';
import { OrdenIT } from '../../../formulario/interfaces/orden.interface';

@Component({
  selector: 'app-tabla-ordenes',
  standalone: true,
  imports:  [OrdenComponent, CommonModule],
  templateUrl: './tabla-ordenes.component.html',
  styleUrl: './tabla-ordenes.component.css'
})
export default class TablaOrdenesComponent {

  public ordenService: OrdenService = inject(OrdenService);
  public ordenItem: OrdenIT[] = [];

  public verModal: boolean  = false;
  constructor(){
    this.solicitarOrdenes();
  }



  mostrarModalCreacion(){
    this.verModal = true;
  }

  solicitarOrdenes(){
    this.ordenService.solicitarOrden().subscribe({
      next: (resp) => {
        if(resp.ok){
          this.ordenItem = resp.respuesta;
          console.log('datos en el orden item', this.ordenItem);
        }
      },
      error: (error) => {
        console.log('Error en el solicitar ordenes', error);
      }
    })
  }

}
