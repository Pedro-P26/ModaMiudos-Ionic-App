import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutodetalhePage } from './produtodetalhe.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutodetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutodetalhePageRoutingModule {}
