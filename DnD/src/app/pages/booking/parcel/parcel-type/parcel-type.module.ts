import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelTypePageRoutingModule } from './parcel-type-routing.module';

import { ParcelTypePage } from './parcel-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcelTypePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ParcelTypePage]
})
export class ParcelTypePageModule {}
