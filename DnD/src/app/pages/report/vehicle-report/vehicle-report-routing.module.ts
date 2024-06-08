import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleReportPage } from './vehicle-report.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleReportPageRoutingModule {}
