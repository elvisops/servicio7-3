export interface Buscador {
    id:number,
    identidad:string,
    nombre:string,
    empresa:string,
    razon:string,
    rtn:string,
    direccion_empresa:string,
    telefono_empresa:string,
    ciudad:string,
    telefono_emp:string,
    celular_emp:string,
    direccion_emp:string,
    fecha_creacion:string,
    fecha_modificacion:string,
    tipo:string
}

export interface OtrosTelefonos{
    identidad:string,
    nombre:string,
    tipo:string,
    telefono:string,
    descripcion:string,
    crm:string,
    tipificacion:string,
    fecha_creacion:string
}