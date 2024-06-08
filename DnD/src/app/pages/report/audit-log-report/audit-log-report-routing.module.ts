import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditLogReportPage } from './audit-log-report.page';

const routes: Routes = [
  {
    path: '',
    component: AuditLogReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditLogReportPageRoutingModule {}
