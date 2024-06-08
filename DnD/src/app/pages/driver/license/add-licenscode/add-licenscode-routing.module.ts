import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLicenscodePage } from './add-licenscode.page';

const routes: Routes = [
  {
    path: '',
    component: AddLicenscodePage
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
export class AddLicenscodePageRoutingModule {}
