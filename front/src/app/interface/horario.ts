import { Aula } from "./aula"
import { Franja } from "./franja"

export interface Horario {
    id?:number,
    createdAt?:Date
    updatedAt?:Date,
    aula?:Aula,
    franja?:Franja
}
