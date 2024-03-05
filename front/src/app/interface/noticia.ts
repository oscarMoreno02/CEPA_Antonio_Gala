
//Óscar
export interface Noticia {
    id:          number |null;
    titulo:      string;
    enlace?:      string | null;
    idCategoria: number | null;
    foto?:        string | null;
    publicada?:boolean;
    createdAt?:   string;
    updatedAt?:   string;
    secciones?:   Seccion[];
}

export interface Seccion {
    id:        number;
    idNoticia: number | null;
    titulo?:    string | null;
    texto?:     string | null;
    foto?:      string | null;
    createdAt?: string;
    updatedAt?: string;
    enlaces?:   Enlace[];
}

export interface Enlace {
    id?:         number;
    idSeccion?:  number;
    textoClave?: string;
    url?:        string;
    createdAt?:  string;
    updatedAt?:  string;
}

export enum Texto {
    Texto = "texto",
}

export enum SeccioneTitulo {
    Seccion = "Seccion",
}

export enum NoticiaTitulo {
    Noticia = "noticia",
}
