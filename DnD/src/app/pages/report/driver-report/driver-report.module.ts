import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverReportPageRoutingModule } from './driver-report-routing.module';

import { DriverReportPage } from './driver-report.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverReportPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [DriverReportPage]
})
export class DriverReportPageModule {}
