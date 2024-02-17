import { Component, Input, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  imports: [ToastModule,SplitButtonModule],
  templateUrl: './profile-icon.component.html',
  styleUrl: './profile-icon.component.css',
  providers: [ MessageService,AuthService ]
})
export class ProfileIconComponent implements OnInit, OnChanges {
  @Input() roles:Array<string>=[]
  items: MenuItem[];
  @Input() nombre='usuario'
  constructor(private messageService: MessageService, private servicioAutenticacion:AuthService) {
      this.items = [
          {
              label: 'Update',
              icon: 'pi pi-refresh',
              command: () => {
                  this.update();
              }
          },
          {
              label: 'Delete',
              icon: 'pi pi-times',
              command: () => {
                  this.delete();
              }
          },
          { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
          { separator: true },
          { label: 'Cerrar Sesion', icon: 'pi pi-power-off', routerLink: ['/installation'] }
      ];
  }
ngOnInit(): void {

 this.nombre=this.servicioAutenticacion.getName()
 this.roles=this.servicioAutenticacion.getRoles()
 this.crearMenu()
}
ngOnChanges(changes: SimpleChanges): void {
  
}
  save(severity: string) {
      this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
  }

  update() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
  }
  crearMenu(){
    let menu: MenuItem[]=[];
    for(const rol of this.roles   ){
      if(rol!='Usuario'){
        menu.push({
        label: 'Panel '+rol,
        icon: 'pi pi-wrench',
        command: () => {
         let ruta="/"+rol.split(' ').join('').toLowerCase().toString()
         this.servicioAutenticacion.changeAccess(rol.split(' ').join('').toLowerCase().toString())
          window.location.href=ruta
      },
      
      })
      }
    }
    menu.push({ separator: true },{
      label: 'Cerrar Sesion', icon: 'pi pi-power-off', command: () => {
      this.servicioAutenticacion.logout()
      window.location.href=''
     }
    })
    this.items=menu
  }
}
