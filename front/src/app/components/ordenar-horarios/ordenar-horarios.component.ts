import { ChangeDetectorRef, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { OrderListModule } from 'primeng/orderlist';
import { ToastModule } from 'primeng/toast';
import { PickListModule } from 'primeng/picklist';
import { Horario } from '../../interface/horario';
import { HorarioService } from '../../services/horario.service';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import {  DialogModule } from 'primeng/dialog';
import { Franja } from '../../interface/franja';
import { FranjaService } from '../../services/franja.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-ordenar-horarios',
  standalone: true,
  imports: [OrderListModule,ButtonModule,DialogModule,ToastModule, ConfirmComponent],
  templateUrl: './ordenar-horarios.component.html',
  styleUrl: './ordenar-horarios.component.css',
  encapsulation:ViewEncapsulation.None,
  providers:[MessageService]
})
export class OrdenarHorariosComponent {
  constructor(
    private franjaService: FranjaService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {}
  tipo=0
  franjas!: Franja[];
  horarios2!: Horario[];
  visible=false
  @Output() cerrarModal = new EventEmitter<void>();
    subscripcion=new Subscription()
  ngOnInit() {
      this.franjaService.getAllFranjas().subscribe({
        next:(data:Array<Franja>)=>{
          this.franjas=data
          this.asignar()
        },
        error:(err)=>{
        }
      })
     
  }
  showDialog() {
    this.visible = true;
  }
  cerrar(): void {
    this.cerrarModal.emit();
  }
  guardar(confirm:boolean){
    if(confirm){
      this.messageService.add({ severity: 'info', summary: 'Actualizar orden', detail: 'En curso', life: 3000 });

      this.franjaService.sortFranjas(this.franjas).subscribe({
        next:(data)=>{
    
          this.messageService.add({ severity: 'success', summary: 'Actualizar orden', detail: 'Completada', life: 3000 });
          setTimeout(() => {
            window.location.reload()
          }, 1000); 
        },
        error:(err)=>{
        this.messageService.add({ severity:'error', summary: 'Actualizar orden', detail: 'Cancelada', life: 3000 });

      }
      })
    }
  }
  asignar(){
    for(let i = 0;i<this.franjas.length;i++){
  
      let aux=i+1
    
      this.franjas[i].orden=aux
    }
    
  }
}
