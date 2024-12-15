export interface RespuestaOrden {
  ok: boolean,
  respuesta: OrdenIT[]
}

export interface OrdenIT{
  id_orden: number;
  fecha_registro: string;
  fecha_fin: string;
  categoria: string;
  descripcion: string;
  observacion: string;
  servicio: string;
  nombre_usuario: string;
  id_estado: number;
  estado: string;
}
