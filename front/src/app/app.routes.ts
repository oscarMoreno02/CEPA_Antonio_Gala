import { Routes } from '@angular/router';
import { AdminCategoriasComponent } from './components/admin-categorias/admin-categorias.component';
import { EventosComponent } from './eventos/eventos.component';
import { NoticiasCategoriaComponent } from './components/noticias-categoria/noticias-categoria.component';
import { AdminNoticiaComponent } from './components/admin-noticia/admin-noticia.component';
import { EditContentNoticiaComponent } from './components/edit-content-noticia/edit-content-noticia.component';

export const routes: Routes = [
{path:'administrador',component: AdminCategoriasComponent},
{path:'categoria/:id',component: NoticiasCategoriaComponent},
{path:'categorias/:id/noticia/:noticia',component: NoticiasCategoriaComponent},
{path:'noticia/contenido/:id',component: EditContentNoticiaComponent},
{path:'admin/noticias',component: AdminNoticiaComponent},
{path:'admin/categorias',component:AdminCategoriasComponent},
{path:'eventos/mostrarEventos', component:EventosComponent},

];
