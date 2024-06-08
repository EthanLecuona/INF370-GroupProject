import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleReportPageRoutingModule } from './vehicle-report-routing.module';

import { VehicleReportPage } from './vehicle-report.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    NgChartsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleReportPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [VehicleReportPage]
})
export class VehicleReportPageModule {}
