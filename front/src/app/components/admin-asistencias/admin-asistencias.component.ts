import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-admin-asistencias',
  standalone: true,
  imports: [
    ToastModule
  ],
  templateUrl: './admin-asistencias.component.html',
  styleUrl: './admin-asistencias.component.css'
})
export class AdminAsistenciasComponent {

}
