export interface Evento {
    id:             number | null;
    nombre:         string;
    descripcion:    string;
    fecha:          string;
    hora:           string;
    foto:           string;
    mg:             number;    
    createdAt?:     string;
    updatedAt?:     string;
}