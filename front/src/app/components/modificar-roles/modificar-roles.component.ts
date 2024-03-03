import { Component, EventEmitter ,Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DialogService} from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RolAsignadoService } from '../../services/rol-asignado.service';
import { RolAsignado } from '../../interface/rolAsignado';

@Component({
  selector: 'app-modificar-roles',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ConfirmComponent
  ],
  templateUrl: './modificar-roles.component.html',
  styleUrl: './modificar-roles.component.css',
  providers:[DialogService,MessageService,RolAsignadoService]
})
export class ModificarRolesComponent {

  constructor(
    private servicioRolAsig:RolAsignadoService
  ){}

  @Input() idUser!: number
  ro! : RolAsignado
  rolAsignado : RolAsignado = {
    id:0,
    idUser: 0,
    idRol: 0
  }
  @Output() cerrarModal = new EventEmitter<void>();
  
  @Input() visible: boolean = false

  @Input() tipo = 0

  @Input() esAdmin: boolean = false
  @Input() esJefe: boolean = false
  @Input() esProfe: boolean = false

  showDialog(){
    this.servicioRolAsig.rolesAsignadosGetIdUsu(this.idUser!).subscribe({
      
      next: (rolA:RolAsignado) => {
        //this.ro = rolA
        this.visible=true
        //this.rolAsignado.idRol = rolA.idRol
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  async guardar(b:Boolean){
    if(b){

    }
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }
}
