import { HttpClientModule } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CategoriasService } from '../../services/categorias.service';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia, NoticiaTitulo } from '../../interface/noticia';
import { Subscription } from 'rxjs';
import { PreviewNoticiaComponent } from '../preview-noticia/preview-noticia.component';

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
export class NoticiasCategoriaComponent implements OnInit, OnChanges {
  constructor(
    private servicioNoticia:NoticiaService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
  ){}
  id=new Subscription
  listaNoticias:Array<Noticia>=[]
  subscripcionCategorias: Subscription=new Subscription;
  ngOnInit(): void {
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
  ngOnChanges(changes: SimpleChanges): void {
  }
}
