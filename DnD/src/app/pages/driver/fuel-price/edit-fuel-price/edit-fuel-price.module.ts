import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFuelPricePageRoutingModule } from './edit-fuel-price-routing.module';

import { EditFuelPricePage } from './edit-fuel-price.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFuelPricePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditFuelPricePage]
})
export class EditFuelPricePageModule {}
