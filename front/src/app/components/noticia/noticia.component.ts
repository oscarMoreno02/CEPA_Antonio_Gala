import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NoticiaService } from '../../services/noticia.service';
import { Subscription } from 'rxjs';
import { Noticia } from '../../interface/noticia';
import { CardModule } from 'primeng/card';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { AuthService } from '../../services/auth.service';
//Óscar
@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterLink,
    ButtonModule,
    CardModule,
    CommonModule,
    TagModule
  ],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css',
  encapsulation:ViewEncapsulation.None
})
export class NoticiaComponent implements OnInit {
  constructor(
    private servicioNoticia:NoticiaService,
    private rutaActiva: ActivatedRoute,
    private authService: AuthService
  ){}
  env=environment
  id=new Subscription
  noticia?:Noticia
  subscripcionCategorias: Subscription=new Subscription;
  httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  ngOnInit(): void {
  this.authService.clearAccess()
    this.id = this.rutaActiva.params.subscribe(params => {
      this.subscripcionCategorias = this.servicioNoticia.getNoticiaWithSecciones(params['noticia']).subscribe({
        next: (data: Noticia) => {
 
          this.noticia=data
  
        },
        error: (err) => {
        }
      });
    })
   
  }
esUrl(foto:string):Boolean{
  return this.httpRegex.test(foto)
  }
}

