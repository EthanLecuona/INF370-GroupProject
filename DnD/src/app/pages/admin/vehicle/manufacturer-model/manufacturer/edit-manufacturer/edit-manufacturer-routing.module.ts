import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditManufacturerPage } from './edit-manufacturer.page';

const routes: Routes = [
  {
    path: '',
    component: EditManufacturerPage
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../../../../../home/help/help.module').then( m => m.HelpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditManufacturerPageRoutingModule {}
