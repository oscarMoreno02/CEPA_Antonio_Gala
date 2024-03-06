import { HttpClientModule } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CategoriasService } from '../../services/categorias.service';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia, NoticiaTitulo } from '../../interface/noticia';
import { Subscription } from 'rxjs';
import { PreviewNoticiaComponent } from '../preview-noticia/preview-noticia.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-noticias-categoria',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterLink,
    ButtonModule,
    PreviewNoticiaComponent
  ],
  providers:[NoticiaService],
  templateUrl: './noticias-categoria.component.html',
  styleUrl: './noticias-categoria.component.css'
})
//Óscar
export class NoticiasCategoriaComponent implements OnInit {
  constructor(
    private servicioNoticia:NoticiaService,
    private rutaActiva: ActivatedRoute,
    private authService : AuthService
  ){}
  id=new Subscription
  listaNoticias:Array<Noticia>=[]
  subscripcionCategorias: Subscription=new Subscription;
  ngOnInit(): void {
    this.authService.clearAccess()
    this.id = this.rutaActiva.params.subscribe(params => {
      this.subscripcionCategorias = this.servicioNoticia.getAllNoticiasByCategoria(params['id']).subscribe({
        next: (data: Array<Noticia>) => {
          this.listaNoticias=data
        },
        error: (err) => {
        }
      });
    })
  }
  
}
