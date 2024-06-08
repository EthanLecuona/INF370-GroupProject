import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCompany2Page } from './view-company2.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCompany2Page
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
export class ViewCompany2PageRoutingModule {}
