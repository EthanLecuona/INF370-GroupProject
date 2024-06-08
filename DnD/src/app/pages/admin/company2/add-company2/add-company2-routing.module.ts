import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCompany2Page } from './add-company2.page';

const routes: Routes = [
  {
    path: '',
    component: AddCompany2Page
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
export class AddCompany2PageRoutingModule {}
