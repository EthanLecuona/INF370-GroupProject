import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelExpenditureReportPageRoutingModule } from './fuel-expenditure-report-routing.module';

import { FuelExpenditureReportPage } from './fuel-expenditure-report.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    NgChartsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FuelExpenditureReportPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [FuelExpenditureReportPage]
})
export class FuelExpenditureReportPageModule {}
