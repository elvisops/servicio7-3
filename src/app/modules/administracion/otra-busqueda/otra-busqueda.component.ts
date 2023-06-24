import { Component, ViewChild } from '@angular/core';
import { BuscadorService } from '../buscador/buscador.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { OtrosTelefonos } from '../buscador/buscador';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

//exportaciones
// import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';

@Component({
  selector: 'app-otra-busqueda',
  templateUrl: './otra-busqueda.component.html',
  styleUrls: ['./otra-busqueda.component.css']
})
export class OtraBusquedaComponent {
  identidad: string = ''
  tabla: boolean = false

  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  constructor(
    private service: BuscadorService,
    private auth: AuthService,
    private httpClient: HttpClient,
    // private exportAsService: ExportAsService
  ){}

  listaCliente: OtrosTelefonos[] = []
  DataSource: MatTableDataSource<OtrosTelefonos> = new MatTableDataSource()

  Columnas: string[] = ['identidad','tipo']

  onOpcionChange(){

  }

  Buscar(){
    if (this.identidad === '') {
      this.service.notificacion('Debe ingresar la identidad')
      return
    }
    this.isLoading = true;
    this.service.otraBusqueda(this.identidad).subscribe((r) => {
      var data = this.auth.desencriptar(r.data)
      this.listaCliente = JSON.parse(data)
      this.tabla = true
      console.log(this.listaCliente)
      this.FillTable(this.listaCliente)
      this.isLoading = false
    })
  }

  // exportTableAs(format: SupportedExtensions) {
  //   const exportConfig: ExportAsConfig = {
  //     type: format,
  //     elementIdOrContent: 'tabla' 
  //   };
  //   this.exportAsService.save(exportConfig, 'Datos').subscribe(() => {
  //     // Se ha completado la exportación
  //   });
  // }
  
  FillTable(Datos: OtrosTelefonos[]){
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }
}
