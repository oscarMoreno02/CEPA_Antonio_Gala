import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CategoriasService } from '../../services/categorias.service';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia, NoticiaTitulo } from '../../interface/noticia';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-noticias-categoria',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterLink,
    ButtonModule,
  ],
  providers:[NoticiaService],
  templateUrl: './noticias-categoria.component.html',
  styleUrl: './noticias-categoria.component.css'
})
export class NoticiasCategoriaComponent implements OnInit {
  constructor(
    private servicioNoticia:NoticiaService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
  ){}
  listaNoticias:Array<Noticia>=[]
  subscripcionCategorias: Subscription=new Subscription;
  ngOnInit(): void {
    let id = this.rutaActiva.snapshot.params['id']
    this.subscripcionCategorias = this.servicioNoticia.getAllNoticiasByCategoria(id).subscribe({
      next: (data: Array<Noticia>) => {
        this.listaNoticias=data
        console.log(this.listaNoticias)
      },
      error: (err) => {
        console.log(err);
      }
      
    });
  }
}
