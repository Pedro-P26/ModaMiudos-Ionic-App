import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterdadosPage } from './alterdados.page';

const routes: Routes = [
  {
    path: '',
    component: AlterdadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterdadosPageRoutingModule {}
