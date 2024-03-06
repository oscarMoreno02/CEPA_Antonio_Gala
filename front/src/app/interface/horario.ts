import { Aula } from "./aula"
import { Franja } from "./franja"
import { Reserva } from "./reserva"

export interface Horario {
    id?:number,
    createdAt?:Date
    updatedAt?:Date,
    idAula?:number,
    idFranja?:number
    aula?:Aula,
    franja?:Franja,
    reservado?:null | Reserva,
}
//Óscar