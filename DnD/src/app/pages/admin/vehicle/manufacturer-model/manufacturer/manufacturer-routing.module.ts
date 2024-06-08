import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManufacturerPage } from './manufacturer.page';

const routes: Routes = [
  {
    path: '',
    component: ManufacturerPage
  },
  {
    path: 'edit-manufacturer/:id',
    loadChildren: () => import('./edit-manufacturer/edit-manufacturer.module').then( m => m.EditManufacturerPageModule)
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
export class ManufacturerPageRoutingModule {}
