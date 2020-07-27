import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarDiaPageRoutingModule } from './agregar-dia-routing.module';

import { AgregarDiaPage } from './agregar-dia.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AgregarDiaPageRoutingModule
  ],
  declarations: [AgregarDiaPage]
})
export class AgregarDiaPageModule {}
