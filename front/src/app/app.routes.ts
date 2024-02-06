import { Routes } from '@angular/router';
import { AdminCategoriasComponent } from './components/admin-categorias/admin-categorias.component';
import { NoticiasCategoriaComponent } from './components/noticias-categoria/noticias-categoria.component';

export const routes: Routes = [
{path:'admin/categorias',component: AdminCategoriasComponent},
{path:'categoria/:id',component: NoticiasCategoriaComponent}
];
