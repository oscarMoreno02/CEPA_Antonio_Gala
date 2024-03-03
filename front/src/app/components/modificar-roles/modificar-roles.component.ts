import { Component, EventEmitter ,Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-modificar-roles',
  standalone: true,
  imports: [
    ToastModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './modificar-roles.component.html',
  styleUrl: './modificar-roles.component.css'
})
export class ModificarRolesComponent {

  @Output() cerrarModal = new EventEmitter<void>();
  
  @Input() visible: boolean = false

  @Input() tipo = 0

  @Input() esAdmin: boolean = false
  @Input() esJefe: boolean = false
  @Input() esProfe: boolean = false

  showDialog(){

  }

  cerrar(): void {
    this.cerrarModal.emit();
  }
}
