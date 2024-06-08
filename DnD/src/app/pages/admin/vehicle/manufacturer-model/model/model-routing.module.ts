import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelPage } from './model.page';

const routes: Routes = [
  {
    path: '',
    component: ModelPage
  },
  {
    path: 'edit-model/:id',
    loadChildren: () => import('./edit-model/edit-model.module').then( m => m.EditModelPageModule)
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
export class ModelPageRoutingModule {}
