import { Routes } from '@angular/router';
import { AdminCategoriasComponent } from './components/admin-categorias/admin-categorias.component';
import { EventosComponent } from './eventos/eventos.component';

export const routes: Routes = [
{path:'admin/categorias',component:AdminCategoriasComponent},
{path:'eventos/mostrarEventos', component:EventosComponent}
];
