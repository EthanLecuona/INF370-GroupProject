import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParcelConfidentPage } from './parcel-confident.page';

const routes: Routes = [
  {
    path: '',
    component: ParcelConfidentPage
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
export class ParcelConfidentPageRoutingModule {}
