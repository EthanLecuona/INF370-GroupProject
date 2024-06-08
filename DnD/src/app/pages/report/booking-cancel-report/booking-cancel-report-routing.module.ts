import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingCancelReportPage } from './booking-cancel-report.page';

const routes: Routes = [
  {
    path: '',
    component: BookingCancelReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingCancelReportPageRoutingModule {}
