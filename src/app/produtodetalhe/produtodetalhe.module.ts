import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutodetalhePageRoutingModule } from './produtodetalhe-routing.module';

import { ProdutodetalhePage } from './produtodetalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutodetalhePageRoutingModule
  ],
  declarations: [ProdutodetalhePage]
})
export class ProdutodetalhePageModule {}
