import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelPriorityPageRoutingModule } from './parcel-priority-routing.module';

import { ParcelPriorityPage } from './parcel-priority.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcelPriorityPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ParcelPriorityPage]
})
export class ParcelPriorityPageModule {}
