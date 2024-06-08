import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePage } from './maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenancePage
  },
  {
    path: 'add-maintenance',
    loadChildren: () => import('./add-maintenance/add-maintenance.module').then( m => m.AddMaintenancePageModule)
  },
  {
    path: 'add-mechanic',
    loadChildren: () => import('./add-mechanic/add-mechanic.module').then( m => m.AddMechanicPageModule)
  },
  {
    path: 'delete-maintenance',
    loadChildren: () => import('./delete-maintenance/delete-maintenance.module').then( m => m.DeleteMaintenancePageModule)
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../../../home/help/help.module').then( m => m.HelpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancePageRoutingModule {}
