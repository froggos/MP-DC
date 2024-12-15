export interface Usuario {
    id?:               number;
    run:               string;
    nombres:           string;
    apellido_paterno:  string;
    apellido_materno?: string;
    correo:            string;
    servicio:          Servicio;
    perfil:            Perfil;
    estado:            Estado;
    token?:            string;
}

export interface Estado {
    id:     number;
    estado: string;
}

export interface Perfil {
    id:   number;
    tipo: string;
}

export interface Servicio {
    id:     number;
    nombre: string;
}

export interface Sesion {
    usuario:      Usuario;
    fechaLog?:    Date;
    fechaDeslog?: Date;
    activo:       boolean;
}