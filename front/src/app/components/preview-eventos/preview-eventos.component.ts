/**Laura María Pedraza Gómez */
import { Component, Input } from '@angular/core';
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
export class PreviewEventosComponent {
  @Input() evento!:Evento
  constructor(private router: Router){}
  env=environment
}
