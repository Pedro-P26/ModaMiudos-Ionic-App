import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApoioPage } from './apoio.page';

const routes: Routes = [
  {
    path: '',
    component: ApoioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApoioPageRoutingModule {}
