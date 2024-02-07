import { Routes } from '@angular/router';
import { AdminCategoriasComponent } from './components/admin-categorias/admin-categorias.component';
import { NoticiasCategoriaComponent } from './components/noticias-categoria/noticias-categoria.component';
import { EditNoticiaComponent } from './components/edit-noticia/edit-noticia.component';
import { AdminNoticiaComponent } from './components/admin-noticia/admin-noticia.component';

export const routes: Routes = [
{path:'admin/categorias',component: AdminCategoriasComponent},
{path:'categoria/:id',component: NoticiasCategoriaComponent},
{path:'categorias/:id/noticia/:noticia',component: NoticiasCategoriaComponent},
{path:'noticia/:id',component: EditNoticiaComponent},
{path:'admin/noticias',component: AdminNoticiaComponent},
];
