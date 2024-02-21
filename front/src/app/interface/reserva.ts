import { Aula } from "./aula"
import { Horario } from "./horario"
import { Usuario } from "./usuario"


export interface Reserva {
    id?:number,
    fecha:string,
    idAula:number,
    idProfesor:number,
    idHorario:number,
    createdAt?:Date
    updatedAt?:Date,
    aula?:Aula,
    profesor?:Usuario,
    horario:Horario,
}
