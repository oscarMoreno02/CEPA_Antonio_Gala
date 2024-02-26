import { Component, Input, ViewEncapsulation, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { Noticia } from '../../interface/noticia';
import { Router, RouterLink } from '@angular/router';
//Óscar
@Component({
  selector: 'app-preview-noticia',
  standalone: true,
  imports: [ImageModule, CardModule,RouterLink],
  templateUrl: './preview-noticia.component.html',
  styleUrl: './preview-noticia.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PreviewNoticiaComponent {
@Input() noticia!:Noticia
constructor(private router: Router){}

}
