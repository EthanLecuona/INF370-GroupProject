import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleMapsPage } from './schedule-maps.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleMapsPage
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
export class ScheduleMapsPageRoutingModule {}
