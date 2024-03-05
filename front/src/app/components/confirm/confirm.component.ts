import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';       
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [ConfirmDialogModule,ToastModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
  providers: [ConfirmationService, MessageService]
})
//Óscar
export class ConfirmComponent implements OnInit {
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}
  @Output() confirmacion = new EventEmitter<boolean>();
  @Input() tipo=''
 @Input() color='success'
 @Input() mensaje=''
 mensajeLbl=this.mensaje
 @Input() icono=''
 iconoFinal='pi pi-'
 ngOnInit(): void {

  this.mensajeLbl=this.mensaje
  this.iconoFinal=this.iconoFinal+this.icono
 }
  confirm() {
      this.confirmationService.confirm({
          header: 'Confirmar acción',
          message: this.mensajeLbl,
          acceptIcon: 'pi pi-check mr-2',
          rejectIcon: 'pi pi-times mr-2',
          rejectLabel:'Cancelar',
          acceptLabel:this.tipo,
          rejectButtonStyleClass: 'p-button-outlined p-button-secondary',
          acceptButtonStyleClass:  'p-button-outlined p-button-'+this.color,
          
          accept: () => {
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Actualizado', life: 3000 });
              this.confirmacion.emit(true);
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Actualizacion cancelada', life: 3000 });
              this.confirmacion.emit(false);
          }
      });
  }
}
