import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMaintenancePageRoutingModule } from './add-maintenance-routing.module';

import { AddMaintenancePage } from './add-maintenance.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMaintenancePageRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
  ],
  declarations: [AddMaintenancePage]
})
export class AddMaintenancePageModule {}
