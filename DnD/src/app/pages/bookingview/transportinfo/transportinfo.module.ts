import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportinfoPageRoutingModule } from './transportinfo-routing.module';

import { TransportinfoPage } from './transportinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportinfoPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [TransportinfoPage]
})
export class TransportinfoPageModule {}
