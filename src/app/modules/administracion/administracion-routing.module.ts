import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { OtraBusquedaComponent } from './otra-busqueda/otra-busqueda.component';

const routes: Routes = [
  { path: '', component: AdministracionComponent },
  { path: 'buscador', component:BuscadorComponent, },
  { path: 'otra-busqueda', component:OtraBusquedaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule {}
