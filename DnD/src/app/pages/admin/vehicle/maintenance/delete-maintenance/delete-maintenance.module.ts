import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteMaintenancePageRoutingModule } from './delete-maintenance-routing.module';

import { DeleteMaintenancePage } from './delete-maintenance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteMaintenancePageRoutingModule
  ],
  declarations: [DeleteMaintenancePage]
})
export class DeleteMaintenancePageModule {}
