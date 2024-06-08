import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingCancelReportPageRoutingModule } from './booking-cancel-report-routing.module';

import { BookingCancelReportPage } from './booking-cancel-report.page';
import { NgChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    NgChartsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BookingCancelReportPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [BookingCancelReportPage]
})
export class BookingCancelReportPageModule {}
