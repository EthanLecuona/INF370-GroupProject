import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceReportPageRoutingModule } from './maintenance-report-routing.module';

import { MaintenanceReportPage } from './maintenance-report.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceReportPageRoutingModule,
    Ng2SearchPipeModule,
    NgChartsModule
  ],
  declarations: [MaintenanceReportPage]
})
export class MaintenanceReportPageModule {}
