import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParcelPriorityPage } from './parcel-priority.page';

const routes: Routes = [
  {
    path: '',
    component: ParcelPriorityPage
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
export class ParcelPriorityPageRoutingModule {}
