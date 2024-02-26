import { Aula } from "./aula"
import { Horario } from "./horario"
import { Usuario } from "./usuario"

//Óscar
  //Estado 0 => pendiente  1=> Vencido  2=> En curso
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
    horario?:Horario,
    estado?:number,
}
