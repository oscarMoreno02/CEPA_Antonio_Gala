import { Component, Input, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia, Seccion } from '../../interface/noticia';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditNoticiaDataComponent } from '../edit-noticia-data/edit-noticia-data.component';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../interface/categoria';
import { NuevaSeccionComponent } from '../nueva-seccion/nueva-seccion.component';
import { EditarSeccionComponent } from '../editar-seccion/editar-seccion.component';
import { EnlaceService } from '../../services/enlace.service';
import { NuevoEnlaceComponent } from '../nuevo-enlace/nuevo-enlace.component';
import { EditarEnlaceComponent } from '../editar-enlace/editar-enlace.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FotosNoticiasService} from '../../services/fotosNoticias.service';
import { environment } from '../../../environments/environment.development';
@Component({
  selector: 'app-edit-noticia-content',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    EditNoticiaDataComponent,
    NuevaSeccionComponent,
    EditarSeccionComponent,
    NuevoEnlaceComponent,
    EditarEnlaceComponent,
    ToastModule
  ],
  templateUrl: './edit-content-noticia.component.html',
  styleUrl: './edit-content-noticia.component.css',
  providers:[MessageService]
})
export class EditContentNoticiaComponent implements OnInit {
constructor(
  private servicioNoticias:NoticiaService,
  private rutaActiva: ActivatedRoute,
  private servicioCategorias:CategoriasService,
  private messageService:MessageService,
  private servicioFoto:FotosNoticiasService
  ){}
  foto:string | null=null
  id = this.rutaActiva.snapshot.params['id']
  subscripcion:Subscription=new Subscription
  noticia:Noticia={id:null,titulo:'',idCategoria:null,secciones:[]}
  listaCategorias:Array<Categoria>=[]
ngOnInit(): void {
  
  this.id = this.rutaActiva.snapshot.params['id']
 this.subscripcion= this.servicioNoticias.getNoticiaWithSecciones(this.id).subscribe({
    next:(data:Noticia)=>{
      this.noticia=data
      console.log(this.noticia)
      if(this.noticia.foto){
        this.foto=environment.baseUrl+environment.urlFotos+'/'+this.noticia.foto
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
  this.subscripcion=this.servicioCategorias.getAllCategorias().subscribe({
    next:(data:Array<Categoria>)=>{
      this.listaCategorias=data
      console.log(data)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
contarSecciones(seccion:Seccion):Number{
  let contador=1
  let i=0
  let continua=true
  while(continua || i>this.noticia.secciones!.length){
    if(this.noticia.secciones![i].id==seccion.id){
      continua=false
    }else{
      contador++
    }
    i++
  }
  return contador
}

}
