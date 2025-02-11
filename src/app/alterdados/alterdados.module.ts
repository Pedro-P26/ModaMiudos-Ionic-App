import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterdadosPageRoutingModule } from './alterdados-routing.module';

import { AlterdadosPage } from './alterdados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AlterdadosPageRoutingModule
  ],
  declarations: [AlterdadosPage]
})
export class AlterdadosPageModule {}
