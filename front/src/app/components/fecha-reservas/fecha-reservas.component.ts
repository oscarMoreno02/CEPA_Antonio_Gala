import { Component, EventEmitter, Input, KeyValueDiffers, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { SeccionService } from '../../services/seccion.service';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia, Seccion } from '../../interface/noticia';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FotosSeccionesService } from '../../services/fotos-secciones.service';
import { environment } from '../../../environments/environment.development';
import { HorarioService } from '../../services/horario.service';
import { CalendarModule } from 'primeng/calendar';
import { Horario } from '../../interface/horario';
//Óscar
@Component({
  selector: 'app-fecha-reservas',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    CalendarModule
  ],
  providers: [MessageService, HorarioService],
  templateUrl: './fecha-reservas.component.html',
  styleUrl: './fecha-reservas.component.css'
})
export class FechaReservasComponent {
  constructor(
    public messageService: MessageService,
    private servicioHorarios: HorarioService,
    private router: Router,
  ) { }
  @Input() visible: boolean = false;
  @Input() tipo?: number = 0
  @Input() id: number = 0
  subscripcionSeccion: Subscription = new Subscription;
  seccionEditar: Seccion = { id: 0, titulo: '', idNoticia: 0 }

  estiloValidacionTitulo = ''
  estiloValidacionTexto = ''
  @Output() newHorarios = new EventEmitter<Array<Horario>>()
  @Output() newDate=new EventEmitter<Date>()
  @Input() day = 0
  @Input() month = 0
  @Input() year = 0
  @Input() horarios: Array<Horario> = []
  date: Date = new Date();

  minDate: Date | undefined;

  maxDate: Date | undefined;


  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.year + 1);

  }
  showDialog() {

    this.visible = true;
  }
  buscar() {

    this.subscripcionSeccion = this.servicioHorarios.getAllHorariosOfAulaWithReservas(
      this.id,
      this.date.getDate(),
      this.date.getMonth() + 1,
      this.date.getFullYear()
    ).subscribe({
      next: (data: Array<Horario>) => {
        this.horarios = data
        this.newHorarios.emit(this.horarios)
    
        this.visible = false
        this.day = this.date.getDate()
        this.month = this.date.getMonth()+1
        this.year = this.date.getFullYear()

        this.newDate.emit(this.date)
       
      },
      error: (err) => {

      }
    })


  }
 
  cerrar() {
    this.visible = false
  }
}
