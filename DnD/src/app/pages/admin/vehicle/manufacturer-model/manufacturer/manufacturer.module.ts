import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManufacturerPageRoutingModule } from './manufacturer-routing.module';

import { ManufacturerPage } from './manufacturer.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManufacturerPageRoutingModule, 
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [ManufacturerPage]
})
export class ManufacturerPageModule {}
