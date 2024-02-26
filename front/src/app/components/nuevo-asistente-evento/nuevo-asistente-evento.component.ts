import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-nuevo-asistente-evento',
  standalone: true,
  imports: [ToastModule,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: './nuevo-asistente-evento.component.html',
  styleUrl: './nuevo-asistente-evento.component.css',
  providers: [

  ]
})
export class NuevoAsistenteEventoComponent {
  @Input() visible = false;
  @Output() cerrarModal = new EventEmitter<void>();
  showDialog() {
    this.visible = true;
  }
  cerrar(): void {
    this.cerrarModal.emit();
  }
}
