import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManufacturerModelPage } from './manufacturer-model.page';

const routes: Routes = [
  {
    path: '',
    component: ManufacturerModelPage
  },
  {
    path: 'model',
    loadChildren: () => import('./model/model.module').then( m => m.ModelPageModule)
  },
  {
    path: 'manufacturer',
    loadChildren: () => import('./manufacturer/manufacturer.module').then( m => m.ManufacturerPageModule)
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
export class ManufacturerModelPageRoutingModule {}
