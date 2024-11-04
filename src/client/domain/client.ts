// Client.ts
export default class Client {
    id: number | null;
    uuid: string;
    nombre: string;
    apellido_pa: string;
    apellido_ma: string;
    sexo: string;
    correo: string;
    contrasena: string;
    telefono: string;
    fecha_nacimiento: string;

    constructor(
        id: number | null,
        uuid: string,
        nombre: string,
        apellido_pa: string,
        apellido_ma: string,
        sexo: string,
        correo: string,
        contrasena: string,
        telefono: string,
        fecha_nacimiento: string
    ) {
        this.id = id;
        this.uuid = uuid;
        this.nombre = nombre;
        this.apellido_pa = apellido_pa;
        this.apellido_ma = apellido_ma;
        this.sexo = sexo;
        this.correo = correo;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.fecha_nacimiento = fecha_nacimiento;
    }
}
