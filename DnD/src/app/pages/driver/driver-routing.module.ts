import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverPage } from './driver.page';

const routes: Routes = [
  {
    path: '',
    component: DriverPage
  },
  {
    path: 'rating',
    loadChildren: () => import('./rating/rating.module').then( m => m.RatingPageModule)
  },
  
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'license',
    loadChildren: () => import('./license/license.module').then( m => m.LicensePageModule)
  },
  {
    path: 'incident',
    loadChildren: () => import('./incident/incident.module').then( m => m.IncidentPageModule)
  },
  {
    path: 'schedule-maps/:id',
    loadChildren: () => import('./schedule-maps/schedule-maps.module').then( m => m.ScheduleMapsPageModule)
  },
  {
    path: 'fuel-price',
    loadChildren: () => import('./fuel-price/fuel-price.module').then( m => m.FuelPricePageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'post-inspection',
    loadChildren: () => import('./post-inspection/post-inspection.module').then( m => m.PostInspectionPageModule)
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../home/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverPageRoutingModule {}
