import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';

// import {MatButtonModule} from '@angular/material/button';
// import {MatCardModule} from '@angular/material/card';

import { BuscadorComponent } from './buscador/buscador.component';
import { MaterialsModule } from '../public/materials/materials.module';
import { OtraBusquedaComponent } from './otra-busqueda/otra-busqueda.component';
import { BuscadorRegistrosComponent } from './buscador/buscador-registros/buscador-registros.component';




@NgModule({
  declarations: [
    AdministracionComponent,
    BuscadorComponent,
    OtraBusquedaComponent,
    BuscadorRegistrosComponent,

  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    // MatButtonModule,
    // MatCardModule,
    MaterialsModule
    
  ],
  schemas: [
    
  ]

})
export class AdministracionModule { }
