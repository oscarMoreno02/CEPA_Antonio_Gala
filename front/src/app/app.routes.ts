import { Routes } from '@angular/router';
import { AdminCategoriasComponent } from './components/admin-categorias/admin-categorias.component';
import { AdminEventosComponent } from './components/admin-eventos/admin-eventos.component';
import { NoticiasCategoriaComponent } from './components/noticias-categoria/noticias-categoria.component';
import { AdminNoticiaComponent } from './components/admin-noticia/admin-noticia.component';
import { EditContentNoticiaComponent } from './components/edit-content-noticia/edit-content-noticia.component';
import { accesoGuard } from './guards/acceso.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ListaAulasComponent } from './components/lista-aulas/lista-aulas.component';
import { ListaFranjasComponent } from './components/lista-franjas/lista-franjas.component';
import { ListaHorariosAulaComponent } from './components/lista-horarios-aula/lista-horarios-aula.component';
import { AdminAsistenciasComponent } from './components/admin-asistencias/admin-asistencias.component';
import { ListaReservasComponent } from './components/lista-reservas/lista-reservas.component';
import { ReservarAulaComponent } from './components/reservar-aula/reservar-aula.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { TusEventosComponent } from './components/tus-eventos/tus-eventos.component';
import { AdminGaleriaComponent } from './components/admin-galeria/galeria.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { VistaEventosComponent } from './components/vista-eventos/vista-eventos.component';


export const routes: Routes = [
{path: '', component:HomeComponent },
{path: 'administrador', pathMatch: 'full', redirectTo: '/admin'},
{path:'admin',component: AdminCategoriasComponent ,
 canActivate: [accesoGuard],data: { rol: ['Administrador'] }},
 {path: 'jefedeestudios', pathMatch: 'full', redirectTo: '/aulas'},

{path:'aulas',component:ListaAulasComponent,
 canActivate: [accesoGuard],data: { rol: ['Jefe de estudios'] } },

 {path:'users',component:UsersComponent,
 canActivate: [accesoGuard],data: { rol: ['Administrador'] } },

 {path:'aulas/franjas',component:ListaFranjasComponent,
 canActivate: [accesoGuard],data: { rol: ['Jefe de estudios'] } },

 {path:'aulas/:id/horarios',component:ListaHorariosAulaComponent,
 canActivate: [accesoGuard],data: { rol: ['Jefe de estudios'] } },

 {path:'aulas/reservas',component:ListaReservasComponent,
 canActivate: [accesoGuard],data: { rol: ['Jefe de estudios'] } },

 {path:'aulas/:id/reservas',component:ListaReservasComponent,
 canActivate: [accesoGuard],data: { rol: ['Jefe de estudios'] } },


 {path: 'profesor', pathMatch: 'full', redirectTo: '/reservas'},
 {path:'reservas',component:ListaReservasComponent,
 canActivate: [accesoGuard],data: { rol: ['Profesor'] } },

 {path:'reservas/aulas',component:ListaAulasComponent,
 canActivate: [accesoGuard],data: { rol: ['Profesor'] } },
 
 {path:'reservas/aulas/:id/horarios',component:ReservarAulaComponent,
 canActivate: [accesoGuard],data: { rol: ['Profesor'] } },

{path:'categoria/:id',component: NoticiasCategoriaComponent},

{path:'categoria/:id/noticia/:noticia',component: NoticiaComponent},

{path:'noticia/contenido/:id',component: EditContentNoticiaComponent,
canActivate: [accesoGuard],data: { rol: ['Administrador'] }},

{path:'admin/noticias',component: AdminNoticiaComponent,
canActivate: [accesoGuard],data: { rol: ['Administrador'] }},

{path:'admin/categorias',component:AdminCategoriasComponent,
 canActivate: [accesoGuard],data: { rol: ['Administrador'] }},

{path:'admin/eventos', component:AdminEventosComponent,
canActivate:[accesoGuard], data:{rol:['Administrador']}},

{path:'admin/asistencias/:id', component:AdminAsistenciasComponent,
canActivate:[accesoGuard], data:{rol:['Administrador']}},

{path:'eventos/evento/:id', component:EventosComponent},

{path:'eventos/tus-eventos/:id', component:TusEventosComponent},

{path:'admin/galeria/:id', component:AdminGaleriaComponent,
canActivate: [accesoGuard], data:{rol:['Administrador']}},

{path:'eventos', component:VistaEventosComponent},

{path: '**', component: NotFoundComponent},
];
