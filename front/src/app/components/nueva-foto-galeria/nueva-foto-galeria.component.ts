import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { GaleriaService } from '../../services/galeria.service';
import { FotosGaleriaService } from '../../services/fotos-galeria.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from "../confirm/confirm.component";
import { Galeria } from '../../interface/galeria';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-nueva-foto-galeria',
    standalone: true,
    templateUrl: './nueva-foto-galeria.component.html',
    styleUrl: './nueva-foto-galeria.component.css',
    providers: [
        DialogService,
        MessageService,
        GaleriaService,
        FotosGaleriaService,
    ],
    imports: [
        ToastModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        ConfirmComponent
    ]
})
export class NuevaFotoGaleriaComponent implements OnInit {

  constructor(
    public messageService:MessageService,
    private servicioGaleria:GaleriaService,
    private servicioFoto:FotosGaleriaService,
  ){}
  ngOnInit(): void {
    this.galeria.idEvento = this.id
  }

  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();

  formularioFoto: FormData | null = null
  fotoPreview: string | null = null
  
  showDialog() {
    this.visible = true;
  }
  cerrar(): void {
    this.cerrarModal.emit();
  }
  
  limpiarFoto(archivo: any) {
    archivo.value = null
    this.formularioFoto = null
    this.fotoPreview = null
  }
  
  
  uplodadFoto(event: any) {
    const file = event.target.files[0]
    if (file) {
      const permitidas = ['.jpeg', '.jpg', '.png'];
      const fichero = file.name.toLowerCase();
      const extension = fichero.substring(fichero.lastIndexOf('.'));
    
      if (permitidas.includes(extension)) {
      this.formularioFoto = new FormData()
      this.formularioFoto.append('archivo', file)
      this.fotoPreview = URL.createObjectURL(file);
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Subir foto', detail: 'Extensión no valida ', life: 3000 });
        this.formularioFoto=null
      }
    } else {
      this.formularioFoto = null
    }
  }

  galeria: any = {
    idEvento : 0,
    foto:''
  }

  @Input() id!:number

  crear(confirm:Boolean){
    if (confirm) {
      
      if(this.formularioFoto != null){
        this.servicioFoto.uploadFoto(this.formularioFoto).subscribe({
          next:(data:any) => {
            this.galeria.foto = data.url
            this.messageService.add({ severity: 'info', summary:'Subir fotografía', detail:'En curso', life:3000});
            this.servicioGaleria.insertGaleria(this.galeria).subscribe({
              next: (data: any) => {
                this.messageService.add({severity: 'success', summary:'Subir fotografía', detail:'Completado', life:3000});
                setTimeout(() => {
                  window.location.reload()
                },1000);

              },
              error: (error) => {
                this.messageService.add({severity: 'error', summary:'Subir fotografía', detail:'Algo ha ido mal, inténtelo de nuevo', life:3000});
              }
            });
          },
          error: (error) => {
            this.messageService.add({severity: 'error', summary:'Subir fotografía', detail:'Algo ha ido mal al subir la foto, inténtelo de nuevo', life:3000});
          }
        }); 
      }
    }
  }
}

  