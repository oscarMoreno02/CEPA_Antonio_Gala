/**Laura María Pedraza Gómez */
import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Evento } from '../../interface/evento';

@Component({
  selector: 'app-preview-eventos',
  standalone: true,
  imports: [ImageModule, CardModule,RouterLink],
  templateUrl: './preview-eventos.component.html',
  styleUrl: './preview-eventos.component.css'
})
export class PreviewEventosComponent{
  @Input() evento!:Evento
  @Input() ruta!:String 
  constructor(private router: Router){}
  env=environment
}
