import { Component,OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuscadorService } from '../buscador.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { OtrosTelefonos } from '../buscador';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-buscador-registros',
  templateUrl: './buscador-registros.component.html',
  styleUrls: ['./buscador-registros.component.css']
})
export class BuscadorRegistrosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  constructor(
    private service: BuscadorService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}
  
  ListaTelefonos: OtrosTelefonos[] = []
  DataSource: MatTableDataSource<OtrosTelefonos> = new MatTableDataSource()
  Columnas: string[] = ["telefono","descripcion","crm"]


  identidad:string = this.data.identidad
  nombre:string = this.data.nombre
  empresa:string = this.data.empresa
  razon:string = this.data.razon
  rtn:string = this.data.rtn
  direccion_empresa:string = this.data.direccion_empresa
  telefono_empresa:string = this.data.telefono_empresa
  ciudad:string = this.data.ciudad
  telefono_emp:string = this.data.telefono_emp
  celular_emp:string = this.data.celular_emp
  direccion_emp:string = this.data.direccion_emp
  fecha_creacion:string = this.data.fecha_creacion
  fecha_modificacion:string = this.data.fecha_modificacion
  tipo:string = this.data.tipo


  isContentVisible = false;
  panelOpenStateB1 = true;
  panelOpenStateB2 = true;


  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  ngOnInit(): void {
    this.genListaTelefonos()
  }

  genListaTelefonos(){
    this.service.getListaTelefonos(this.identidad).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaTelefonos = JSON.parse(data)
      this.FillTable(this.ListaTelefonos)
      console.log(data)

    })
  }

  Filtrar(evt: Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase()
    if(this.DataSource.paginator){
      this.DataSource.paginator.firstPage()
    }
  }

  FillTable(Datos: OtrosTelefonos[]){
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }
}
