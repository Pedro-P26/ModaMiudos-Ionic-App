import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LojareservaPageRoutingModule } from './lojareserva-routing.module';

import { LojareservaPage } from './lojareserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LojareservaPageRoutingModule
  ],
  declarations: [LojareservaPage]
})
export class LojareservaPageModule {}
