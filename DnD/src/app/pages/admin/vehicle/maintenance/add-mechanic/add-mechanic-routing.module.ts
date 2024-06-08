import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMechanicPage } from './add-mechanic.page';

const routes: Routes = [
  {
    path: '',
    component: AddMechanicPage
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
export class AddMechanicPageRoutingModule {}
