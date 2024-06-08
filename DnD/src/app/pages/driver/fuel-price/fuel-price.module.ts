import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelPricePageRoutingModule } from './fuel-price-routing.module';

import { FuelPricePage } from './fuel-price.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuelPricePageRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
   
  ],
  declarations: [FuelPricePage]
})
export class FuelPricePageModule {}
