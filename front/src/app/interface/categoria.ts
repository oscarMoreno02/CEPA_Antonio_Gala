//Óscar
export interface Categoria {
    id:            number | null;
    nombre:        string;
    dependiente:   number | null;
    createdAt?:     string;
    updatedAt?:     string;
    subcategorias?: Categoria[];
}
