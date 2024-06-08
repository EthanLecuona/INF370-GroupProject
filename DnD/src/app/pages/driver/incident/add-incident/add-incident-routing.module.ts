import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddIncidentPage } from './add-incident.page';

const routes: Routes = [
  {
    path: '',
    component: AddIncidentPage
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
export class AddIncidentPageRoutingModule {}
