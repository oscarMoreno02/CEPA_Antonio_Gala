//Raul y Laura

import { EnvironmentInjector, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { io } from "socket.io-client";
import { Evento } from '../interface/evento';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',

})
export class EventoWebsocketService  {
  
socket?:any
  private url=environment.urlEventosSocket

constructor(private message:MessageService) {
    this.socket = io(this.url, {

})
;
this.socket.on("connect", () => {

});


this.socket.on("enviar-evento", (data:Evento) => {

  this.message.add({ severity: 'info', id:'unique-message-id', summary: 'Nuevo Evento', detail:`<a href="${data.nombre}" target="_blank">${data.nombre}</a>`, life: 6000 });
  setTimeout(() => {
    const messageElement = document.querySelector('#unique-message-id .p-toast-detail');
    if (messageElement) {
      const link = document.createElement('a');
      link.href = '/eventos/evento/'+data.id!.toString(); 
      link.textContent = 'Ver evento'; 
      link.target = '_blank'; 
      const content = 'Nombre:  <br> <br> ' + data.nombre + ' <br>   <br>';
      messageElement.innerHTML = content;
      messageElement.appendChild(link);
    }
  },  0);
});
}
public sendNoticifacion(message: Evento): void {
    this.socket.emit('evento-creado', message);
  }

}
