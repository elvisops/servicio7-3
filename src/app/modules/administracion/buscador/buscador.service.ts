import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of} from 'rxjs'
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor(
    private http:HttpClient,
    private snack: MatSnackBar,
    private auth:AuthService
  ) { }

  api = environment.api
  // identidad:string
  buscarIdentidad(identidad:string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc:"buscar_identidad",
      identidad:identidad
    })
    return this.http.post<any>(`${this.api}api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al buscar la identidad"))
    )

    
  }

  buscarPorNombres(nombre:string, apellido:string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc:"buscar_por_nombre",
      nombre:nombre,
      apellido:apellido
    })
    return this.http.post<any>(`${this.api}api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al buscar por el nombre y apellido"))
    )
  }

  buscarPorTelefono(telefono:string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc:"buscar_por_telefono",
      telefono:telefono
    })
    return this.http.post<any>(`${this.api}api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al buscar por telefono"))
    )
  }

  busquedaMultiple(arregloIdentidades:string[]){
    var payload = this.auth.mkpayload({
      proc:"busqueda_multiple",
      arregloIdentidades:arregloIdentidades
    })
    return this.http.post<any>(`${this.api}api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al buscar las identidades"))
    )
  }

  otraBusqueda(identidad:string){
    var payload = this.auth.mkpayload({
      proc:"busqueda_por_identificacion",
      identidad:identidad
    })
    // api/getProc
    return this.http.post<any>(`${this.api}api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al realizar las otras busquedas"))
    )
  }

  getListaTelefonos(identidad:string){
    var payload = this.auth.mkpayload({
      proc:"buscar_otros_telefonos",
      identidad: identidad
    })
    return this.http.post<any>(`${this.api}api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de telefonos"))
    )
  }

  notificacion(msg:string):void{
    this.snack.open(msg, "Cerrar",{
      horizontalPosition:"center",
      verticalPosition:"top",
      duration:5000
    })
  }

  private handleError<T>(operation = 'operacion', result?:T){
    return(error:any):Observable<T>=>{
      console.log('Error en la aplicacion: '+JSON.stringify(error))
      this.notificacion(operation)
      console.log(error)
      return of(result as T)
    }
  }
}
