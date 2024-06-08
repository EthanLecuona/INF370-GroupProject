import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelExpenditureReportPage } from './fuel-expenditure-report.page';

const routes: Routes = [
  {
    path: '',
    component: FuelExpenditureReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelExpenditureReportPageRoutingModule {}
