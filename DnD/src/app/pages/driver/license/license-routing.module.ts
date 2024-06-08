import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicensePage } from './license.page';

const routes: Routes = [
  {
    path: '',
    component: LicensePage
  },
  {
    path: 'add-licenscode',
    loadChildren: () => import('./add-licenscode/add-licenscode.module').then( m => m.AddLicenscodePageModule)
  },
  {
    path: 'edit-licenscode/:id',
    loadChildren: () => import('./edit-licenscode/edit-licenscode.module').then( m => m.EditLicenscodePageModule)
  },
  {
    path: 'help/:id',
    loadChildren: () => import('../../home/help/help.module').then( m => m.HelpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicensePageRoutingModule {}
