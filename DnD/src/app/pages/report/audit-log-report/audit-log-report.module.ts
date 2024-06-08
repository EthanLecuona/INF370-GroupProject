import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditLogReportPageRoutingModule } from './audit-log-report-routing.module';

import { AuditLogReportPage } from './audit-log-report.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditLogReportPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AuditLogReportPage]
})
export class AuditLogReportPageModule {}
