

export interface RespuestaPerfil{
  ok: boolean,
  respuesta: PerfilIT[]
}

export interface PerfilIT{
  id_perfil: number,
  perfil: string
}
