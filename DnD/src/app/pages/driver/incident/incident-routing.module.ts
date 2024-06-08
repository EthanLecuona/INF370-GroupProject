import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentPage } from './incident.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentPage
  },
  {
    path: 'add-incident-status',
    loadChildren: () => import('./add-incident-status/add-incident-status.module').then( m => m.AddIncidentStatusPageModule)
  },
  {
    path: 'add-incident',
    loadChildren: () => import('./add-incident/add-incident.module').then( m => m.AddIncidentPageModule)
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../../home/help/help.module').then( m => m.HelpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentPageRoutingModule {}
