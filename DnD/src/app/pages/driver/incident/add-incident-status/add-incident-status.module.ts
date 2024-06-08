import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddIncidentStatusPageRoutingModule } from './add-incident-status-routing.module';

import { AddIncidentStatusPage } from './add-incident-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddIncidentStatusPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddIncidentStatusPage]
})
export class AddIncidentStatusPageModule {}
