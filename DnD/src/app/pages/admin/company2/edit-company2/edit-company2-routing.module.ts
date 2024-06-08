import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCompany2Page } from './edit-company2.page';

const routes: Routes = [
  {
    path: '',
    component: EditCompany2Page
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
export class EditCompany2PageRoutingModule {}
