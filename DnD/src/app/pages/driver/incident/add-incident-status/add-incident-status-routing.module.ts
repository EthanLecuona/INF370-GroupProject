import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddIncidentStatusPage } from './add-incident-status.page';

const routes: Routes = [
  {
    path: '',
    component: AddIncidentStatusPage
  },
  {
    path: 'edit-incident-status/:id',
    loadChildren: () => import('./edit-incident-status/edit-incident-status.module').then( m => m.EditIncidentStatusPageModule)
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
export class AddIncidentStatusPageRoutingModule {}
