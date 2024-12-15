

export interface RespuestaServicios {
  ok: boolean,
  respuesta: ServiciosIT[]
}

export interface ServiciosIT {
  id_servicio: number,
  servicio: string,
}
