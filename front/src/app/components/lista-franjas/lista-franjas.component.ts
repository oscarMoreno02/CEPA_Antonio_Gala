import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';
import { AulaService } from '../../services/aula.service';
import { NuevaAulaComponent } from '../nueva-aula/nueva-aula.component';
import { EditarAulaComponent } from '../editar-aula/editar-aula.component';
import { Franja } from '../../interface/franja';
import { FranjaService } from '../../services/franja.service';
import { NuevaFranjaComponent } from '../nueva-franja/nueva-franja.component';
import { EditarFranjaComponent } from '../editar-franja/editar-franja.component';
import { OrdenarHorariosComponent } from '../ordenar-horarios/ordenar-horarios.component';
//Óscar
@Component({
  selector: 'app-lista-franjas',
  standalone: true,
  imports: [ 
    HttpClientModule,
    RouterLink,
    TableModule,
    ButtonModule,
    NuevaCategoriaComponent,
    EditarCategoriaComponent,
    NuevaAulaComponent,
    EditarAulaComponent,
    NuevaFranjaComponent,
    EditarFranjaComponent,
    OrdenarHorariosComponent
  ],
  providers:[AulaService],
  templateUrl: './lista-franjas.component.html',
  styleUrl: './lista-franjas.component.css'
})
export class ListaFranjasComponent implements OnInit {
  constructor(    
    private servicioFranja:FranjaService,
    private router: Router){}
    subscripcionFranjas: Subscription=new Subscription;
    listaFranjas:Array<Franja>=[]
    ngOnInit(): void {
      this.subscripcionFranjas = this.servicioFranja.getAllFranjas().subscribe({
        next: (data: Array<Franja>) => {
          this.listaFranjas=data
        },
        error: (err) => {
        }

      });
    }
}
