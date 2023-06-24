import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from './materials/materials.module';
import { PublicComponent } from './public.component';



@NgModule({
  declarations: [
    PublicComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule
  ],
  schemas:[
    
  ]
})
export class PublicModule { }
