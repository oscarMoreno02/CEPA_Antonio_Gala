import { Routes } from '@angular/router';
import { AdminCategoriasComponent } from './components/admin-categorias/admin-categorias.component';
import { EventosComponent } from './eventos/eventos.component';
import { NoticiasCategoriaComponent } from './components/noticias-categoria/noticias-categoria.component';
import { AdminNoticiaComponent } from './components/admin-noticia/admin-noticia.component';
import { EditContentNoticiaComponent } from './components/edit-content-noticia/edit-content-noticia.component';
import { accesoGuard } from './guards/acceso.guard';

export const routes: Routes = [
    {path: 'administrador', pathMatch: 'full', redirectTo: '/admin'},
{path:'admin',component: AdminCategoriasComponent ,
 canActivate: [accesoGuard],data: { rol: ['Administrador'] }},

{path:'categoria/:id',component: NoticiasCategoriaComponent},

{path:'categorias/:id/noticia/:noticia',component: NoticiasCategoriaComponent},
{path:'noticia/contenido/:id',component: EditContentNoticiaComponent,
canActivate: [accesoGuard],data: { rol: ['Administrador'] }},

{path:'admin/noticias',component: AdminNoticiaComponent,
canActivate: [accesoGuard],data: { rol: ['Administrador'] }},

{path:'admin/categorias',component:AdminCategoriasComponent,
 canActivate: [accesoGuard],data: { rol: ['Administrador'] }},

{path:'eventos/mostrarEventos', component:EventosComponent},

];
