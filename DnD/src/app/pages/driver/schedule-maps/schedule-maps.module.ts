import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScheduleMapsPageRoutingModule } from './schedule-maps-routing.module';
import { ScheduleMapsPage } from './schedule-maps.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleMapsPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ScheduleMapsPage],
})
export class ScheduleMapsPageModule {}
