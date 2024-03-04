/*Laura María Pedraza Gómez* */
export interface Evento {
    id:             number | null;
    nombre:         string;
    descripcion:    string;
    fecha:          string;
    hora:           string;
    fotoCartel:     string;
    mg:             number;
    visibilidad:    boolean;
    numAsistentes:  number;    
    createdAt?:     string;
    updatedAt?:     string;
}