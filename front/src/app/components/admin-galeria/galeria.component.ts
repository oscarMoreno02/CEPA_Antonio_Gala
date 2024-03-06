/**Laura María Pedraza Gómez */
import { NuevaFotoGaleriaComponent } from "../nueva-foto-galeria/nueva-foto-galeria.component";
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { GaleriaService } from "../../services/galeria.service";
import { ActivatedRoute } from "@angular/router";
import { Galeria } from "../../interface/galeria";
import { environment } from "../../../environments/environment.development";
import { ConfirmComponent } from "../confirm/confirm.component";
import { FotosGaleriaService } from "../../services/fotos-galeria.service";
import { ToastModule } from "primeng/toast";
import { ViewEncapsulation } from "@angular/compiler";

@Component({
    selector: 'app-galeria',
    standalone: true,
    templateUrl: './galeria.component.html',
    styleUrl: './galeria.component.css',
    providers: [
        MessageService,
        GaleriaService
    ],
    imports: [
        NuevaFotoGaleriaComponent,
        TableModule,
        ButtonModule,
        ConfirmComponent,
        ToastModule
    ],


})
export class AdminGaleriaComponent implements OnInit{
  galerias: Array<Galeria> = []
  eventoId:number = 0
  fotos : any = []

  constructor(
    private servicioGaleria : GaleriaService,
    private messageService:MessageService,
    private route: ActivatedRoute,
    private fotosGaleriaServicio : FotosGaleriaService
  ){}
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
       this.eventoId = +idParam;
       this.servicioGaleria.getGaleriaEvento(this.eventoId).subscribe({
         next: (fotos: any) => {
           this.galerias = fotos;
           this.fotos=fotos
           this.formatearSrc();
         },
       });
    }
   }
   
   formatearSrc() {
    for (let i = 0; i < this.galerias.length; i++) {
       if (!this.galerias[i].foto.includes('http') || !this.galerias[i].foto.includes('https')) {
         this.galerias[i].foto = environment.baseUrl+ '/uploads/galerias/' + this.galerias[i].foto;
       }
    }
   }

   foto:string = ''

   eliminar(idGaleria:number, confirm:Boolean){
    if (confirm){

      for (var i=0 ; i<this.fotos.length ; i++){
        if(this.fotos[i].id == idGaleria){
          this.foto = this.fotos[i].foto
        }
      }
      this.servicioGaleria.deleteGaleria(idGaleria).subscribe({
        next:(data:any) => {
            window.location.reload()
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Eliminar fotografía', detail: 'Completada', life:  3000 })
            },  1000) 
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Eliminar fotografía', detail: 'Error al eliminar la fotografía, inténtelo de nuevo', life:  3000 });
    
        }
      })
      
    }
   }
   
}
