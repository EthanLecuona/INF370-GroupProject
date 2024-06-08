import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditManufacturerPageRoutingModule } from './edit-manufacturer-routing.module';

import { EditManufacturerPage } from './edit-manufacturer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditManufacturerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditManufacturerPage]
})
export class EditManufacturerPageModule {}
