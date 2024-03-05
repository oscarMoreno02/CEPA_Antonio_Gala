import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NuevaNoticiaComponent } from '../nueva-noticia/nueva-noticia.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NoticiaService } from '../../services/noticia.service';
import { Subscription } from 'rxjs';
import { Noticia } from '../../interface/noticia';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../interface/categoria';
import { EditNoticiaDataComponent } from '../edit-noticia-data/edit-noticia-data.component';
//Óscar
@Component({
  selector: 'app-admin-noticia',
  standalone: true,
  imports: [
    NuevaNoticiaComponent,
    HttpClientModule,
    RouterLink,
    TableModule,
    ButtonModule,
    EditNoticiaDataComponent,
    RouterLink
  ],
    providers:[NoticiaService, CategoriasService],
  templateUrl: './admin-noticia.component.html',
  styleUrl: './admin-noticia.component.css',
  encapsulation:ViewEncapsulation.None
  
})
export class AdminNoticiaComponent implements OnInit {
  constructor(
    private servicioNoticia:NoticiaService,
    private router: Router,
    private servicioCategoria:CategoriasService
  ){}
  subscripcionNoticia: Subscription=new Subscription;
  listaNoticias:Array<Noticia>=[]
  listaCategorias:Array<Categoria>=[]
    @Input() admin=true
  
  ngOnInit(): void {

    this.subscripcionNoticia = this.servicioNoticia.getAllNoticias().subscribe({
      next: (data: Array<Noticia>) => {
        this.listaNoticias=data
        this.servicioCategoria.getAllCategorias().subscribe({
          next:(n:Array<Categoria>)=>{
            this.listaCategorias=n

          },
          error:(err)=>{

          }
        })
      },
      error: (err) => {
      }
    });
  }
}
