import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmComponent } from "../confirm/confirm.component";
import { Usuario } from '../../interface/usuario';
import { FormsModule, NgModel } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { AsistenciaService } from '../../services/asistencia.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-nuevo-asistente-evento',
    standalone: true,
    templateUrl: './nuevo-asistente-evento.component.html',
    styleUrl: './nuevo-asistente-evento.component.css',
    providers: [MessageService, AsistenciaService, DialogService],
    imports: [
      ToastModule,
        DialogModule,
        ButtonModule, 
        ConfirmComponent,
        InputTextModule,
        FormsModule
      ]
})
export class NuevoAsistenteEventoComponent {
  validacionEmail = ''
  @Input() visible = false;
  @Output() cerrarModal = new EventEmitter<void>();
  showDialog() {
    this.visible = true;
  }
  cerrar(): void {
    this.cerrarModal.emit();
  }
  guardar(b:Boolean){

  }

  usuario: Usuario = {
    nombre: "",
    email: "",
    password: ""
  }
}
