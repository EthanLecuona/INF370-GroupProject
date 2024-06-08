import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelConfidentPageRoutingModule } from './parcel-confident-routing.module';

import { ParcelConfidentPage } from './parcel-confident.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcelConfidentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ParcelConfidentPage]
})
export class ParcelConfidentPageModule {}
