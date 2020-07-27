import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarDiaPage } from './agregar-dia.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarDiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarDiaPageRoutingModule {}
