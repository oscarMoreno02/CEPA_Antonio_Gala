//Raul

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
  providers:[
    DialogService,
    MessageService,
    RolAsignadoService
  ]
})
export class ModificarRolesComponent {

  constructor(
    public messageService:MessageService,
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
  
      next: (rolesAsignados: RolAsignado[]) => {
        rolesAsignados.forEach(rol => {
          if (rol.idRol === 1) {
            this.esAdmin = true;
          } else if (rol.idRol === 2) {
            this.esJefe = true;
          } else if (rol.idRol === 3) {
            this.esProfe = true;
          }
        });
  
        this.visible = true;
      },
      error: (e) => {
  
      }
    })
  }

  async guardar(b:Boolean){
    if(b){
      this.messageService.add({ severity: 'info', summary:'Modificación de los roles', detail:'En curso', life:3000});
      if(this.esAdmin){
        this.servicioRolAsig.rolesAsignadosPost(this.idUser, 1)
      }else{
        this.servicioRolAsig.rolesAsignadosDelete(this.idUser,1)
      }

      if(this.esJefe){
        this.servicioRolAsig.rolesAsignadosPost(this.idUser,2)
      }else{
        this.servicioRolAsig.rolesAsignadosDelete(this.idUser,2)
      }

      if(this.esProfe){
        this.servicioRolAsig.rolesAsignadosPost(this.idUser,3)
      }else{
        this.servicioRolAsig.rolesAsignadosDelete(this.idUser,3)
      }
    }
    this.messageService.add({ severity: 'success', summary:'Modificación de los roles', detail:'Terminada', life:3000});
    this.visible = false
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }
}
