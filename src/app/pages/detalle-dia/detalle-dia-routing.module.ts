import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleDiaPage } from './detalle-dia.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleDiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleDiaPageRoutingModule {}
