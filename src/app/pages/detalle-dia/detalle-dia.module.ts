import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleDiaPageRoutingModule } from './detalle-dia-routing.module';

import { DetalleDiaPage } from './detalle-dia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleDiaPageRoutingModule
  ],
  declarations: [DetalleDiaPage]
})
export class DetalleDiaPageModule {}
