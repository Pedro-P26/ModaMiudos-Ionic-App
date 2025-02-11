import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LojareservaPage } from './lojareserva.page';

const routes: Routes = [
  {
    path: '',
    component: LojareservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LojareservaPageRoutingModule {}
