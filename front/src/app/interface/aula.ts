import { Horario } from "./horario";

export interface Aula {
    id?:number,
    nombre:string,
    createdAt?:Date,
    updatedAt?:Date,
    horarios?:Array<Horario>
}
