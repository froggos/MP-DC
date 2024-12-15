import { CommonModule } from '@angular/common';
import { Component, inject, input, InputSignal, OnChanges, output, SimpleChanges, ViewContainerRef } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

interface DatosTabla {
  cabeceras?:      string[];
  datosPorPagina?: number;
  paginaActiva?:   number;
  paginas?:        number;
  paginasActivas?: number[];
  offset?:         number;
  datosActivos?:   any[];
  datosTotales?:   number;
  cadenaBusqueda?: string;
}

@Component({
  selector: 'app-tabla',
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnChanges {
  private _viewContainer = inject(ViewContainerRef);
  private _inputSubject  = new Subject<string>();

  public datos           : InputSignal<{}[] | undefined>     = input();
  public cabeceras       : InputSignal<string[] | undefined> = input();
  public botonAccion     : InputSignal<boolean>              = input(true);
  public barraBusqueda   : InputSignal<boolean>              = input(true);
  public registrosTotales: InputSignal<number | undefined>   = input();
  public filasTemplate   : any                               = input();

  public emitirPagina   = output<any[]>();
  public emitirConsulta = output<string>();
  public emitirAccion   = output<boolean>();
  
  datosTabla: DatosTabla = {
    paginaActiva: 1,
    datosPorPagina: 5,
    cadenaBusqueda: '',
  };

  constructor() {
    if (this.barraBusqueda()) {
      this._inputSubject.pipe(debounceTime(300)).subscribe({
        next: (value) => {
          this.emitirConsulta.emit(value);
          this.emitirPagina.emit([
            (this.datosTabla.paginaActiva! - 1) * this.datosTabla.datosPorPagina!, 
            this.datosTabla.datosPorPagina, 
            this.datosTabla.cadenaBusqueda,
          ]);
        },
      })
    }

    this.datosTabla.cabeceras = this.cabeceras();
    this.datosTabla.datosActivos = this.datos()!;
    this.datosTabla.datosTotales = this.registrosTotales();

    this.datosTabla.paginas = Math.ceil(this.datosTabla.datosTotales! / this.datosTabla.datosPorPagina!);

    if (this.filasTemplate()) {
      this._viewContainer.createEmbeddedView(this.filasTemplate());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['datos'] && changes['datos'].currentValue) {
      this.datosTabla.datosActivos = changes['datos'].currentValue;
    }

    if (changes['registrosTotales'] && changes['registrosTotales'].currentValue) {
      this.datosTabla.datosTotales = changes['registrosTotales'].currentValue;
      this.datosTabla.paginas = Math.ceil(this.datosTabla.datosTotales! / this.datosTabla.datosPorPagina!);
    }
  }

  get paginas() {
    const inicio = Math.max(1, this.datosTabla.paginaActiva! - 2);
    const final = Math.min(this.datosTabla.paginas!, this.datosTabla.paginaActiva! + 2);

    return this.datosTabla.paginasActivas = Array.from({length: final - inicio + 1}, (_, i) => {
      return inicio + i;
    });
  }

  public cambiarPagina = (pagina: number) => {
    this.datosTabla.paginaActiva = pagina;

    this.emitirPagina.emit([
      (pagina - 1) * this.datosTabla.datosPorPagina!, 
      this.datosTabla.datosPorPagina!,
      this.datosTabla.cadenaBusqueda,
    ]);
  }

  public retroceder = () => {
    if (this.datosTabla.paginaActiva! <= 1) return;

    this.datosTabla.paginaActiva = this.datosTabla.paginaActiva! - 1;

    this.emitirPagina.emit([
      (this.datosTabla.paginaActiva - 1) * this.datosTabla.datosPorPagina!, 
      this.datosTabla.datosPorPagina!,
      this.datosTabla.cadenaBusqueda,
    ]);
  }

  public avanzar = () => {
    if (this.datosTabla.paginaActiva! >= this.datosTabla.paginas!) return;

    this.datosTabla.paginaActiva = this.datosTabla.paginaActiva! + 1;

    this.emitirPagina.emit([
      (this.datosTabla.paginaActiva - 1) * this.datosTabla.datosPorPagina!, 
      this.datosTabla.datosPorPagina!,
      this.datosTabla.cadenaBusqueda,
    ]);
  }

  public cambiarCantidadDatos = (evt: Event) => {
    const valor = (evt.target as HTMLSelectElement).value;
    this.datosTabla.datosPorPagina = Number(valor);

    this.datosTabla.paginas = Math.ceil(this.datosTabla.datosTotales! / this.datosTabla.datosPorPagina!);

    this.emitirPagina.emit([
      (this.datosTabla.paginaActiva! - 1) * this.datosTabla.datosPorPagina!, 
      this.datosTabla.datosPorPagina, 
      this.datosTabla.cadenaBusqueda,
    ]);
  }

  public cadenaConsulta = (evt: Event) => {
    this.datosTabla.cadenaBusqueda = (evt.target as HTMLSelectElement).value;
    this._inputSubject.next(this.datosTabla.cadenaBusqueda);
  }

  public eventoClick = () => {
    this.emitirAccion.emit(true);
  }
}
