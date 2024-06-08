import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportPage } from './report.page';

const routes: Routes = [
  {
    path: '',
    component: ReportPage
  },
  {
    path: 'booking-cancel-report',
    loadChildren: () => import('./booking-cancel-report/booking-cancel-report.module').then( m => m.BookingCancelReportPageModule)
  },
  {
    path: 'maintenance-report',
    loadChildren: () => import('./maintenance-report/maintenance-report.module').then( m => m.MaintenanceReportPageModule)
  },
  {
    path: 'audit-log-report',
    loadChildren: () => import('./audit-log-report/audit-log-report.module').then( m => m.AuditLogReportPageModule)
  },
  {
    path: 'driver-report',
    loadChildren: () => import('./driver-report/driver-report.module').then( m => m.DriverReportPageModule)
  },
  {
    path: 'vehicle-report',
    loadChildren: () => import('./vehicle-report/vehicle-report.module').then( m => m.VehicleReportPageModule)
  },
  {
    path: 'fuel-expenditure-report',
    loadChildren: () => import('./fuel-expenditure-report/fuel-expenditure-report.module').then( m => m.FuelExpenditureReportPageModule)
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../home/help/help.module').then( m => m.HelpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPageRoutingModule {}
