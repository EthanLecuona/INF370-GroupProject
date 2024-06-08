import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditIncidentStatusPage } from './edit-incident-status.page';

const routes: Routes = [
  {
    path: '',
    component: EditIncidentStatusPage
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../../../../home/help/help.module').then( m => m.HelpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditIncidentStatusPageRoutingModule {}
