import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditIncidentStatusPageRoutingModule } from './edit-incident-status-routing.module';

import { EditIncidentStatusPage } from './edit-incident-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditIncidentStatusPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditIncidentStatusPage]
})
export class EditIncidentStatusPageModule {}
