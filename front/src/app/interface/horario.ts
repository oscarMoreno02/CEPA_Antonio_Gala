import { Aula } from "./aula"
import { Franja } from "./franja"

export interface Horario {
    id?:number,
    createdAt?:Date
    updatedAt?:Date,
    idAula?:number,
    idFranja?:number
    aula?:Aula,
    franja?:Franja
}
