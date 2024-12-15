

export interface RespuestaCategoria{
  ok: boolean,
  respuesta: CategoriaIt[]
}

export interface CategoriaIt{
  id_categoria: number,
  categoria: string,
}
