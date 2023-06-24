import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './modules/administracion/administracion.component';
import { BuscadorComponent } from './modules/administracion/buscador/buscador.component';

const routes: Routes = [
  { path: '', redirectTo: 'buscador', pathMatch: 'full' },
  { path: 'buscador', component: BuscadorComponent },
  { 
    path: 'administracion', 
    loadChildren: () => 
      import('./modules/administracion/administracion.module').then(m => m.AdministracionModule)
  },  
  // { path: 'buscador', component: BuscadorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
