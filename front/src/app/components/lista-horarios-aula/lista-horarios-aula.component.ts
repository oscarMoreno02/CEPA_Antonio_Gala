import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { HorarioService } from '../../services/horario.service';
import { Horario } from '../../interface/horario';
import { Aula } from '../../interface/aula';
@Component({
  selector: 'app-lista-horarios-aula',
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
    EditarFranjaComponent
  ],
  providers:[HorarioService],
  templateUrl: './lista-horarios-aula.component.html',
  styleUrl: './lista-horarios-aula.component.css'
})
export class ListaHorariosAulaComponent implements OnInit {
  constructor(    
    private servicioHorario:HorarioService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private servicioAulas:AulaService
    ){}
    subscripcionHorarios: Subscription=new Subscription;
    listaHorarios:Array<Horario>=[]
    idAula = this.rutaActiva.snapshot.params['id']
    @Input() aula?:Aula
    
    ngOnInit(): void {
      this.subscripcionHorarios = this.servicioHorario.getAllHorariosOfAula(this.idAula).subscribe({
        next: (data: Array<Horario>) => {
          this.listaHorarios=data
        },
        error: (err) => {
        }

      });
      this.subscripcionHorarios = this.servicioHorario.getAllHorariosOfAula(this.idAula).subscribe({
        next: (data: Array<Horario>) => {
          this.listaHorarios=data
        },
        error: (err) => {
        }

      });
    }
}
