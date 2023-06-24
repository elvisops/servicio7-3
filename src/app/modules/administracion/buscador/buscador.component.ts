import { Component, OnInit, ViewChild } from '@angular/core';
import { BuscadorService } from './buscador.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Buscador, OtrosTelefonos } from './buscador';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorRegistrosComponent } from './buscador-registros/buscador-registros.component';

import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],

})
export class BuscadorComponent implements OnInit {

  
  opcionId: number | string = 0;
  ListaOpciones: any[] = [
    { ID: '1', OPCION: 'Busqueda por Identidad' },
    { ID: '2', OPCION: 'Busqueda por Nombres' },
    { ID: '3', OPCION: 'Busqueda por Telefono' },
    { ID: '4', OPCION: 'Busqueda Multiple' },
  ];

  opcionSeleccionada: any;
  identidad: string = '';
  identidad1: string = '';
  identidad2: string = '';
  identidad3: string = '';
  identidad4: string = '';
  identidad5: string = '';
  identidad6: string = '';
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  tabla1: boolean = false;
  tabla2: boolean = false;
  tabla3: boolean = false;
  isLoading: boolean = false;

  //api para obtener mi ip
  api_key = 'YOUR API KEY';
  url = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + this.api_key;
  ipAddress = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;
  constructor(
    private service: BuscadorService,
    private auth: AuthService,
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private exportAsService: ExportAsService,
    private http: HttpClient,
    
  ) {}
  ListaClientes: Buscador[] = [];
  ListaClientes2: OtrosTelefonos[] = [];
  DataSource: MatTableDataSource<Buscador> = new MatTableDataSource();
  DataSource2: MatTableDataSource<OtrosTelefonos> = new MatTableDataSource();

  // id, identidad, nombre, empresa
  Columnas: string[] = ['identidad', 'nombre', 'tipo', 'OPCIONES'];
  Columnas2: string[] = [
    'identidad',
    'nombre',
    'tipo',
    'telefono',
    'descripcion',
    'opciones',
  ];
  Columnas3: string[] =['identidad','nombre','tipo']
  arregloIdentidades: string[] = []

  onOpcionChange() {
    this.opcionSeleccionada = this.ListaOpciones.find(
      (opcion) => opcion.ID == this.opcionId
    );
    this.opcionId = this.opcionSeleccionada.ID;
  }

  userIP = ''
  localIPAddress: string = '';

  ngOnInit() {
    // console.log(this.getLocalIPAddress()
    //   .then(ipAddress => this.localIPAddress = ipAddress)
    //   .catch(error => console.error(error)));
    // console.log(this.getLocalIPAddress());
    // this.getLocalIPAddress();

  }


  getLocalIPAddress() {
    this.http.get('http://localhost:3000/ip').subscribe(
      (response: any) => {
        this.localIPAddress = response;
      },
      (error) => {
        console.error('Error al obtener la dirección IP local:', error);
      }
    );
  }
  // getLocalIPAddress() {
  //   this.localIPAddress = this.deviceService.getDeviceInfo().ip;
  // }

  getLocalIPAddresss(): Promise<string> {
    return new Promise((resolve, reject) => {
      const peerConnection = new RTCPeerConnection({ iceServers: [] });
  
      peerConnection.createDataChannel('');
      peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .catch(error => reject(error));
  
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          const ipAddress = event.candidate?.candidate.split(' ')[4];
          resolve(ipAddress);
          peerConnection.onicecandidate = null;
        }
      };
    });
  }
  getIpAddress() {
    return this.http.get('https://api.ipify.org/?format=json');
  }



  getIp() {


    // var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.RTCPeerConnection||w.RTCPeerConnection)
    //   ({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{
    //     try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
    // findIP.then(function(ip) {
    // console.log(ip);
    // })

    // return
    this.httpClient
      .get('https://api.ipify.org/?format=json')
      .subscribe((response: any) => {
        const localIPAddress = response.ip;
        console.log(localIPAddress); // Imprime la dirección IP local en la consola
      });
  }
  Buscar() {
    switch (this.opcionId) {
      case '1':
        if (this.identidad === '') {
          this.service.notificacion('Debe Ingresar la identidad');
          return;
        }
        this.isLoading = true;
        this.service.buscarIdentidad(this.identidad).subscribe((r) => {
          var data = this.auth.desencriptar(r.data);
          this.ListaClientes = JSON.parse(data);
          this.tabla1 = true;
          this.tabla2 = false;
          this.tabla3 = false
          console.log(this.ListaClientes)
          this.FillTable(this.ListaClientes);
          this.isLoading = false
        });
        break;
      case '2':
        if (this.nombre === '' || this.apellido === '') {
          this.service.notificacion('Debe Ingresar el nombre y el apellido');
          return;
        }
        
        this.isLoading = true;
        this.service
          .buscarPorNombres(this.nombre, this.apellido)
          .subscribe((r) => {
            var data = this.auth.desencriptar(r.data);
            this.ListaClientes = JSON.parse(data);
            this.tabla1 = true;
            this.tabla2 = false;
            this.tabla3 = false
            console.log(this.ListaClientes);
            this.FillTable(this.ListaClientes);
            this.isLoading = false
          });
        break;
      case '3':
        if (this.telefono === '') {
          this.service.notificacion('Debe Ingresar el numero de telefono');
          return;
        }

        this.isLoading = true;
        this.service.buscarPorTelefono(this.telefono).subscribe((r) => {
          var data = this.auth.desencriptar(r.data);
          this.ListaClientes2 = JSON.parse(data);
          this.tabla1 = false;
          this.tabla2 = true;
          this.tabla3 = false
          console.log(this.ListaClientes2);
          this.FillTable2(this.ListaClientes2);
          this.isLoading = false
        });
        break;
      case '4':
        if (this.identidad1 === '') {
          this.service.notificacion(
            'Debe Ingresar al menos una identificacion' + this.identidad1
          );
          return;
        }
        this.arregloIdentidades = [];
        this.arregloIdentidades.push(this.identidad1)
        this.arregloIdentidades.push(this.identidad2)
        this.arregloIdentidades.push(this.identidad3)
        this.arregloIdentidades.push(this.identidad4)
        this.arregloIdentidades.push(this.identidad5)
        this.arregloIdentidades.push(this.identidad6)

        this.isLoading = true;
        this.service
          .busquedaMultiple(
            this.arregloIdentidades
          )
          .subscribe((r) => {
            var data = this.auth.desencriptar(r.data);
            this.ListaClientes = JSON.parse(data);
            this.tabla1 = false;
            this.tabla2 = false;
            this.tabla3 = true
            console.log(this.ListaClientes);
            this.FillTable(this.ListaClientes);
            this.isLoading = false
          });
        break;
      default:
        break;
    }
  }

  exportTableAs(format: SupportedExtensions) {
    const exportConfig: ExportAsConfig = {
      type: format,
      elementIdOrContent: 'tabla' 
    };
    this.exportAsService.save(exportConfig, 'Datos').subscribe(() => {
      // Se ha completado la exportación
    });
  }

  Filtrar(evt: Event) {
    const valorFiltrado = (evt.target as HTMLInputElement).value;
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
    }
  }

  AbrirDialogoRegistro(Buscador: any) {
    const dialogRef = this.dialog.open(BuscadorRegistrosComponent, {
      width: '80%',
      data: Buscador,
      // disableClose:true
    });
  }

  FillTable(Datos: Buscador[]) {
    this.DataSource = new MatTableDataSource(Datos);
    this.DataSource.sort = this.sort;
    this.DataSource.paginator = this.paginator;
  }

  FillTable2(Datos: OtrosTelefonos[]) {
    this.DataSource2 = new MatTableDataSource(Datos);
    this.DataSource2.sort = this.sort;
    this.DataSource2.paginator = this.paginator;
  }
}
