import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditVehiclePageRoutingModule } from './edit-vehicle-routing.module';

import { EditVehiclePage } from './edit-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditVehiclePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditVehiclePage]
})
export class EditVehiclePageModule {}
