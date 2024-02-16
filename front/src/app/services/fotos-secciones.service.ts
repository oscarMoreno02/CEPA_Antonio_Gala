import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FotosSeccionesService {

 
  baseUrl=environment.baseUrl+environment.urlFotosSecciones
  constructor(private http:HttpClient) { }

 
  uploadFoto(formdata:FormData): Observable<any> {
     return this.http.post<any>(this.baseUrl,formdata)
   }
   getFotoURL(id:string): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteFoto(foto:string): Observable<any> {
    return this.http.delete<any>(this.baseUrl+'/'+foto)
  }
  updateFoto(previa:string,formdata:FormData): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/'+previa,formdata)
  }
}
