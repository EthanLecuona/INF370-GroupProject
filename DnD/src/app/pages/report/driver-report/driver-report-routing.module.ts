import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverReportPage } from './driver-report.page';

const routes: Routes = [
  {
    path: '',
    component: DriverReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverReportPageRoutingModule {}
