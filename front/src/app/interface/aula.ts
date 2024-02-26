import { Horario } from "./horario";
//Óscar
export interface Aula {
    id?:number,
    nombre:string,
    createdAt?:Date,
    updatedAt?:Date,
    horarios?:Array<Horario>
}
