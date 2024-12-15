

export interface RespuestaUsuario {
  ok: boolean,
  respuesta: UsuarioIT[]
}

export interface UsuarioIT{
  id_usuario: number;
  run: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  id_servicio: number;
  servicio: string;
  id_perfil: number;
  perfil: string;
  id_estado_usuario: number;
  estado_usuario: string;
}

export interface RespuestaEstadoUsuario{
  ok: boolean,
  respuesta: EstadoUsuarioIT[]
}

export interface EstadoUsuarioIT{
  id_estado_usuario: number;
  estado_usuario: string;
}
